import React from 'react';
import styled from 'styled-components';
import { useStoreActions } from 'easy-peasy';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Button, Divider } from '@material-ui/core';
import { readAsJson, exportJsonFile } from '../../../../common/services/file';
import importData from '../../../services/importData';
import { StorageFactory } from '../../../../common/services/storage';

const StyledImportInput = styled.input`
  display: none;
`;

const exportData = () => {
  return StorageFactory.getStorage()
    .getPagesForExport()
    .then(pages => {
      exportJsonFile(pages, 'yi-note.json');
    });
};

const ExportAndImport = () => {
  const { t } = useTranslation('options');
  const {
    alerts: { show: showAlerts },
    reset
  } = useStoreActions(actions => actions);

  const handleImportFile = e => {
    readAsJson(e.target.files[0])
      .then(({ version, data }) => {
        if (version !== '1.0.0') {
          throw new Error(t('settings.import.version.error'));
        }
        return importData(data);
      })
      .then(() => {
        showAlerts({
          content: t('settings.import.success')
        });
      })
      .catch(e => {
        showAlerts({
          content: e.message || t('settings.import.general.error')
        });
      });
  };

  const handleExportFile = () => {
    exportData();
  };

  const handleExportAndClear = () => {
    exportData()
      .then(() => {
        return StorageFactory.getStorage().clearAll();
      })
      .then(() => reset());
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item container spacing={1} direction="column">
        <Grid item>
          <Typography variant="h6">
            {t('settings.exportAndImport.title')}
          </Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Typography variant="body1" color="textSecondary">
            {t('settings.exportAndImport.description')}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={4}>
        <Grid item>
          <Typography variant="subtitle1">
            {t('settings.export.title')}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={handleExportFile}
          >
            {t('settings.export.button')}
          </Button>
        </Grid>
      </Grid>
      <Grid item container spacing={4}>
        <Grid item>
          <Typography variant="subtitle1">
            {t('settings.import.title')}
          </Typography>
        </Grid>
        <Grid item>
          <StyledImportInput
            accept=".json"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleImportFile}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              component="span"
            >
              {t('settings.import.button')}
            </Button>
          </label>
        </Grid>
      </Grid>
      <Grid item container spacing={4}>
        <Grid item>
          <Typography variant="subtitle1">
            {t('settings.exportAndClear.title')}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={handleExportAndClear}
          >
            {t('settings.exportAndClear.button')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ExportAndImport;

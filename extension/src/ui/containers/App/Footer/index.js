import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '../../../../common/components/IconButton';
import { GITHUB_URL } from '../../../../constants';

const StyledContainer = styled(Grid)`
  padding: 10px 5px;
  background: #fafafa;
`;

const Footer = () => {
  const { t } = useTranslation('footer');

  const openGithubRepo = () => {
    window.open(GITHUB_URL, '_blank');
  };

  const openManagementPage = () => {
    browser.runtime.sendMessage({ action: 'open-options' });
  };

  return (
    <StyledContainer
      container
      justify="space-between"
      spacing={1}
      alignItems="center"
    >
      <Grid item>
        <IconButton tooltip={t('github.tooltip')} onClick={openGithubRepo}>
          <GitHubIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          tooltip={t('management.tooltip')}
          onClick={openManagementPage}
        >
          <SettingsIcon />
        </IconButton>
      </Grid>
    </StyledContainer>
  );
};

export default Footer;

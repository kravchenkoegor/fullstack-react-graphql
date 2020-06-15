import React from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TelegramIcon from '@material-ui/icons/Telegram';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      alignItems: 'center',
      backgroundColor: theme.palette.primary.dark,
      color: '#fff',
      display: 'flex',
      height: 64,
      marginTop: 'auto',
      width: '100%'
    },
    iconButton: {
      padding: theme.spacing(1)
    },
    link: {
      color: '#fff',
      transition: 'color .2s ease-in-out',
      '&:hover': {
        color: theme.palette.secondary.main
      }
    }
  })
);

const AppFooter = () => {
  const classes = useStyles();
  return (
    <Box className={classes.footer} px={3}>
      <Typography>
        Made by{' '}
        <a
          href="https://kravchenkoegor.ru/"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          Egor Kravchenko
        </a>
      </Typography>
      <Box ml="auto">
        <IconButton className={classes.iconButton}>
          <a
            href="https://github.com/kravchenkoegor"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            <GitHubIcon />
          </a>
        </IconButton>
        <IconButton className={classes.iconButton}>
          <a
            href="https://www.linkedin.com/in/kravchenko-egor"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            <LinkedInIcon />
          </a>
        </IconButton>
        <IconButton className={classes.iconButton}>
          <a
            href="https://t.me/kravchenko_egor"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}
          >
            <TelegramIcon />
          </a>
        </IconButton>
      </Box>
    </Box>
  );
};

export default AppFooter;

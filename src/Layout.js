import React from 'react';
import { withStyles } from 'material-ui/styles';
import background from './assets/background.jpg';
import Logo from './assets/Logo';

const Layout = ({ children, classes }) => (
  <div className={classes.root}>
    <Logo />
    {children}
  </div>
);

export default withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundAttachment: 'fixed',
    backgroundColor: '#444',
    background: `url('${background}') no-repeat center center fixed`,
    backgroundSize: `cover`,
    padding: '8px',
  },
})(Layout);

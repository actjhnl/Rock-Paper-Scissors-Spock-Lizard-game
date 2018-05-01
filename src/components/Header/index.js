import React, { Component } from 'react';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {AppBar,Toolbar,Typography} from 'material-ui';

import {styles} from './HeaderStyle'

class Header extends Component {
  render() {
    const {classes} = this.props;
    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            Rock-Paper-Scissors-Spock-Lizard game
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);

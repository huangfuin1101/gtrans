import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


import yellow from '@material-ui/core/colors/yellow';
import grey from '@material-ui/core/colors/grey';

import MenuIcon from '@material-ui/icons/Menu';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import styles from './Menu.css'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Save from '@material-ui/icons/Save';
import HomeIcon from '@material-ui/icons/Home';
import CalendarIcon from '@material-ui/icons/DateRange';
import EventIcon from '@material-ui/icons/Event';
import TableIcon from '@material-ui/icons/ViewList';
import GridIcon from '@material-ui/icons/ViewModule';
import SettingsIcon from '@material-ui/icons/Settings';
import LockIcon from '@material-ui/icons/Lock';

import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';

const drawerWidth = 240;



const classes = theme => ({
  palette: {
    primary: {
      light: '#00FF00',
      main: '#FF0000',
      dark: '#0000FF',
      contrastText: '#000',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  fullList: {
    width: 'auto',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    height: '100%',
    width: '200px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  }
});


const pages = [
  {
    name: 'Home',
    icon: <HomeIcon />
  },
  {
    name: 'Messages',
    icon: <PeopleIcon />
  }
]

class Menu extends Component {

  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  drawerOnOpen = () => {
    console.log('opened')
  }

  drawerOnClose = () => {

    this.setState({ open: false });
  }

  renderHorizontalMenu = () => {
    return pages.map(p => {
      return (
        <li key={p.name}>
          <NavLink className={styles.horizItem} activeClassName={styles.horizCurrent} to={`/${p.name.toLowerCase()}`} >
            {p.name.toLowerCase()}
          </NavLink>
        </li>
      )
    })
  }

  renderVerticalMenu = () => {
    return pages.map(p => {
      return (
        <ListItem key={p.name} component={NavLink} activeClassName={styles.vertCurrent} to={`/${p.name.toLowerCase()}`} button>

            <ListItemIcon>
              {p.icon}
            </ListItemIcon>
            <ListItemText primary={p.name} />

        </ListItem>
      )
    })
  }



  render () {

    return (
      <div>
        
      </div>
    )
  }
}

export default Menu


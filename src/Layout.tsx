import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';

import Link from 'next/link';
import { useRouter } from 'next/router';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      backgroundColor: '#fafafa',
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },

    title: {
      flexGrow: 1,
    },
  }),
);

interface LayoutProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container?: any;
  children?: any;
  page?: string;
}

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

interface HideOnScrollProps extends Props {
  page?: string;
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children, window, page } = props;
  const homepage = page === 'home';
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    threshold: 100,
    target: window ? window() : undefined,
  });
  const triggerElevation = useScrollTrigger({
    disableHysteresis: true,
    threshold: 30,
    target: window ? window() : undefined,
  });

  return (
    <div
      className={
        homepage
          ? 'appbar-homepage ' + (triggerElevation ? 'appbar-homepage-elevated' : 'appbar-homepage-muted')
          : 'appbar-other'
      }
    >
      {React.cloneElement(children, {
        elevation: triggerElevation ? 4 : 0,
      })}
    </div>
  );
}

function ScrollTop(props: Props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 1000,
        }}
      >
        {children}
      </div>
    </Zoom>
  );
}

export default function Layout(props: LayoutProps) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const router = useRouter();

  const isSelected = (menu: { link: string }) => {
    return router.pathname === menu.link;
  };

  const drawer = (
    <div>
      <div>
        <Toolbar>
          <Button
            variant="contained"
            color="default"
            size="medium"
            href="https://github.com/rockplate/rockplate"
            style={{
              width: '100%',
            }}
            startIcon={<GitHubIcon />}
          >
            GitHub
          </Button>
        </Toolbar>
      </div>
      <Divider />
      <List>
        {[
          {
            title: 'Home',
            link: '/',
          },
          {
            title: 'Getting Started',
            link: '/getting-started',
          },
          {
            title: 'Data Structure',
            link: '/data-structure',
          },
          {
            title: 'Linter',
            link: '/linter',
          },
        ].map((menu, index) => (
          <Link key={menu.title} href={menu.link} passHref>
            <ListItem button component="a" selected={isSelected(menu)}>
              <ListItemText primary={menu.title} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List subheader={<ListSubheader>Language Reference</ListSubheader>}>
        {[
          {
            title: 'Identifiers',
            link: '/identifiers',
          },
          {
            title: 'Booleans',
            link: '/booleans',
          },
          {
            title: 'Arrays',
            link: '/arrays',
          },
        ].map((menu, index) => (
          <ListItem button component="a" key={menu.title} href={menu.link} selected={isSelected(menu)}>
            <ListItemText primary={menu.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button component="a" href={'https://rockplate.github.io/rockplate/api/'}>
          <ListItemText primary={'API Docs'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar color="transparent" elevation={0} position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              <img
                src="https://avatars3.githubusercontent.com/u/61226601?s=200&v=4"
                style={{
                  height: '40px',
                  marginRight: '8px',
                  verticalAlign: 'middle',
                }}
              />
              Rockplate
            </Typography>
            <IconButton
              color="inherit"
              aria-label="GitHub"
              href="https://github.com/rockplate/rockplate"
              className="right-action-button"
            >
              <GitHubIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <ThemeProvider theme={darkTheme}>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </ThemeProvider>
      <main className={classes.content}>
        <Toolbar id="back-to-top-anchor" />
        {props.children}
        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </main>
    </div>
  );
}

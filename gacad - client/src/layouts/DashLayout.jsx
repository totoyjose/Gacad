import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme, alpha } from '@mui/material/styles';
import {
  Box, Drawer as MuiDrawer, AppBar as MuiAppBar, Toolbar, List,
  CssBaseline, Typography, Divider, IconButton, InputBase, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Button
} from '@mui/material';

import logo from '../assets/styles/f1.jpg';

// Icon imports
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#002147',
  borderBottom: '3px solid #FFD100',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'box-border',
  ...(open && { ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme) }),
  ...(!open && { ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme) }),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: { width: '20ch' },
  },
}));

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ FIXED: Read userType inside component so it updates after login
  const [userType, setUserType] = useState('viewer');

  useEffect(() => {
    const type = localStorage.getItem('type') || 'viewer';
    setUserType(type);
  }, []);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate("/auth/signin");
  };

  // Dynamic nav items - Editors will NOT see Users
  const dashboardNavItems = [
    { label: "Dashboard", title: "Dashboard", to: "/dashboard", icon: DashboardIcon },
    { label: "Articles", title: "Articles", to: "/dashboard/articles", icon: AssessmentIcon },
    { label: "Reports", title: "Reports", to: "/dashboard/reports", icon: AssessmentIcon },
    // Only Admins can see Users page
    ...(userType === 'admin' ? [{
      label: "Users",
      title: "Users",
      to: "/dashboard/users",
      icon: PeopleIcon,
    }] : []),
  ];

  const pageTitle = dashboardNavItems.find(({ to }) => to === location.pathname)?.title ?? "Welcome";

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              edge="start"
              sx={{ marginRight: 2 }}
            >
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>

            <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <Box component="img" src={logo} alt="AGAP" sx={{ height: 36, width: 'auto', backgroundColor: 'white', p: 0.5, borderRadius: '6px', mr: 2, boxShadow: 1 }} />
              <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', color: 'white' }}>
                AGAP <span style={{ color: '#FFD100' }}>Company</span>
              </Typography>
            </Box>

            <Typography variant="h6" noWrap sx={{ fontWeight: 'normal' }}>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginLeft: '12px' }}>
                | &nbsp;{pageTitle}
              </span>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Search>
              <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>

            <Button component={Link} to="/" startIcon={<HomeIcon />} sx={{ color: '#FFD100', fontWeight: 'bold', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              View Website
            </Button>

            <Button variant="outlined" onClick={handleLogout} sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)', fontWeight: 'bold', fontSize: '11px', letterSpacing: '0.1em' }}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {dashboardNavItems.map(({ label, to, icon: Icon }) => (
            <ListItem key={to} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={to}
                selected={location.pathname === to}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? "initial" : "center",
                  ...(location.pathname === to && {
                    backgroundColor: 'rgba(0, 33, 71, 0.08)',
                    borderLeft: '4px solid #002147',
                    '& .MuiSvgIcon-root': { color: '#002147' },
                  })
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#fdfdfd', minHeight: '100vh' }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;
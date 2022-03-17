import { Box, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import Login from 'Features/Auth/components/Login';
import { logout } from 'Features/Auth/userSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Register from '../../Features/Auth/components/Register';
const useStyles = makeStyles((theme) => ({
  root: {
    position:'relative',
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  closeButton:{
    position:'absolute',
    top:theme.spacing(1),
    right:theme.spacing(1),
    color:theme.palette.grey[500],
    zIndex:1
  }
}));

Header.propTypes = {
    
};

// tạo hằng sô MODE
const MODE = {
  LOGIN:'login',
  REGISTER:'register'
}

export default function Header(props) {
    const classes = useStyles();

    // Tạo state để chuyển đổi register form -> login form
    const [mode, setMode] = useState(MODE.LOGIN)

    // thêm Dialog Popup
    const [open, setOpen] = useState(false);

    // tạo biến để nhận biết đã logined hay chưa
    const loggedInUser = useSelector(state => state.user.current)
    const isLoggedIn = loggedInUser.id;

    // sử dụng dispatch
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    // handleClose và khi nhấn chuột ra ngoài sẽ không đón dialog
    const handleClose = (e,reason) => {
        if(reason === 'backdropClick') return;    
        setOpen(false);
    };

    // 
    const [anchorEl, setAnchorEl] = useState(null);

    const handleUserClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

    const handleLogoutClick = () =>{
      // dispatch action logout
      const action = logout();
      dispatch(action);
      // tắt menu 
      setAnchorEl(null);
    }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Sunny ThoundSand
          </Typography>

          {!isLoggedIn &&(
            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
          )}
          
          {isLoggedIn &&(
            <IconButton color="inherit" onClick={handleUserClick}>
              <AccountCircle />
            </IconButton>
          )}

        </Toolbar>
      </AppBar>
      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableEscapeKeyDown>
        <IconButton onClick={handleClose} className={classes.closeButton}>
          <Close />
        </IconButton>
        <DialogContent>
          {/* sau khi register xong sẽ đóng form nên sẽ tạo 1 handle close */}
          { mode===MODE.REGISTER &&(
            <>
            <Register closeDialog={handleClose}/>
            <Box textAlign="center">
              <Button color="primary" onClick={()=>{setMode(MODE.LOGIN)}}>Already an account. Login here</Button>
            </Box>
            </>
          )}

          { mode===MODE.LOGIN &&(
            <>
            <Login closeDialog={handleClose}></Login>
            <Box textAlign="center">
              <Button color="primary" onClick={()=>{setMode(MODE.REGISTER)}}>Don't have an account. Register here</Button>
            </Box>
            </>
          )}
          
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions> */}
      </Dialog>
      {/* Hiển thị menu khi click icon User */}
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        // tùy chỉnh vị trí menu xuất hiện
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

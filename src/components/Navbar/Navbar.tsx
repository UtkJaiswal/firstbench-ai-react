import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const pages = ["Home", "About Us"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [activePage, setActivePage] = React.useState<null | string>(null);
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false); // State to check if the user is logged in
  const [mobileOpen, setMobileOpen] = React.useState(false); // State to control mobile menu

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageClick = (page: string) => {
    setActivePage(page);
    setMobileOpen(false); // Close the mobile menu after clicking
  };

  const handleLogin = () => {
    // Simulate login action
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "black", padding: "20px", marginX: "0" }}>
      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Toolbar disableGutters sx={{ justifyContent: "space-between", display:'flex' }}>
          {/* Firstbench logo for large screens */}
          <Box flex={4} sx={{maxWidth:{xs:'120px',md:'180px',lg:'200px'},display:'flex',justifyContent:'center'}} >
            <img
              src="/Logo.svg"
              alt="Firstbench Logo"
              style={{ height: 'auto',width:'100%'}}
            />
          </Box>

          {/* Centered page buttons */}
          <Box
            sx={{
              position: { xs: "static", md: "absolute" }, // Absolute to center in entire navbar for large screens
              left: "50%",
              transform: { md: "translateX(-50%)" }, // Center the box in large screens
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageClick(page)}
                sx={{
                  my: 2,
                  mx: 1.5,
                  color: "white",
                  display: "block",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: activePage === page ? 700 : 400,
                  textTransform: "none",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Right-side buttons */}
          <Box
            flex={4}
            sx={{
              display:'flex',
              gap:2,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1DD1A1",
                textTransform: "none",
                fontSize:{xs:'0.7em',md:'0.8em'},
                borderRadius:'21px',
                display: { xs:"none" ,sm: "flex" }, // Hide on menu open for small screens
                textWrap: 'nowrap'
              }}
            >
              Contact Us
            </Button>

            {/* Login button */}
            <Box sx={{ flexGrow: 0, display: { xs: "none" , sm: "flex" } }}>
              {loggedIn ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography
                          textAlign="center"
                          sx={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Button
                  variant="outlined"
                  component="a"
                  href="/login"
                  onClick={handleLogin} // Simulate login action
                  sx={{
                    color: "#fff",
                    fontSize:{xs:'0.7em',md:'0.8em'},
                    textTransform: "none",
                    borderRadius:'21px',
                    py:1,
                  }}
                >
                  Login
                </Button>
              )}
            </Box>

            {/* Menu icon for small screens */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton color="inherit" onClick={toggleMobileMenu}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: { xs: "flex", sm: "none" } }}>
              <IconButton color="inherit">
                <Avatar sx={{ width: 28, height: 28 }}/>
              </IconButton>
            </Box>
          </Box>

          {/* Mobile menu drawer */}
          <Drawer
            anchor="top"
            open={mobileOpen}
            onClose={toggleMobileMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <List>
              {pages.map((page) => (
                <ListItem key={page} disablePadding>
                  <ListItemButton onClick={() => handlePageClick(page)}>
                    <ListItemText primary={page} sx={{ textAlign: "center" }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

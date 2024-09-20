import React from 'react';
import { Grid, Typography, Container, Box, Link, ThemeProvider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { theme } from './theme';

function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <footer style={{ backgroundColor: '#FFAC74', color: '#fff', padding: '20px 0', marginTop: 50 }}>
        <Container sx={{ padding: { xs: 2, sm: 4 }}}>
          <Grid container spacing={5}>
            {/* Column 1 */}
            <Grid item xs={12} sm={3}>
              <Box component="img" src="/Logo.svg" alt="FirstBench" sx={{ height: 'auto', width: {xs:150,sm:130,md:200} }} />
              <Typography variant="body2" paragraph sx={{textWrap:'clip'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
            </Grid>

            {/* Column 2 */}
            <Grid item xs={12} sm={3}>
              <Typography style={{ fontSize: 20, marginBottom: '10px' }}>
                Quick Links
              </Typography>
              <Box component="ul" sx={{ listStyleType: 'none', padding: 0 }}>
                <Box component="li" sx={{ mb: 1 }}>About Us</Box>
                <Box component="li" sx={{ mb: 1 }}>Debate rooms</Box>
                <Box component="li" sx={{ mb: 1 }}>Evaluation metrics</Box>
                <Box component="li" sx={{ mb: 1 }}>Profile</Box>
              </Box>
            </Grid>

            {/* Column 3 */}
            <Grid item xs={12} sm={3}>
              <Typography style={{ fontSize: 20, marginBottom: '10px' }}>
                Resources
              </Typography>
              <Box component="ul" sx={{ listStyleType: 'none', padding: 0 }}>
                <Box component="li" sx={{ mb: 1 }}>Support</Box>
                <Box component="li" sx={{ mb: 1 }}>Privacy policy</Box>
                <Box component="li" sx={{ mb: 1 }}>Terms & Conditions</Box>
              </Box>
            </Grid>

            {/* Column 4 */}
            <Grid item xs={12} sm={3}>
              <Typography style={{ fontSize: 20, marginBottom: '10px' }}>
                Social Media
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 ,flexWrap:'wrap'}}>
                <Link href="#" color="inherit" aria-label="Facebook">
                  <FacebookIcon />
                </Link>
                <Link href="#" color="inherit" aria-label="Twitter">
                  <TwitterIcon />
                </Link>
                <Link href="#" color="inherit" aria-label="Instagram">
                  <InstagramIcon />
                </Link>
                <Link href="#" color="inherit" aria-label="LinkedIn">
                  <LinkedInIcon />
                </Link>
                <Link href="#" color="inherit" aria-label="YouTube">
                  <YouTubeIcon />
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </ThemeProvider>
  );
}

export default Footer;

import React from 'react';
import { Grid, Typography, Container, Box, Button, ThemeProvider } from '@mui/material';
import { theme } from './theme';

function EvalSection() {
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ padding: { xs: 2, md: 10 }}}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
          Evaluation Feature
        </Typography>

        <Grid container justifyContent="center" alignItems="center" spacing={5}>
          {/* Image on the left side */}
          <Grid item xs={12} md={6} sx={{ marginTop: { xs: 5, md: 10 } }}>
            <Box
              component="img"
              src="/Group.svg"
              alt="FirstBench"
              sx={{
                width: { xs: '100%', md: '80%' }, // Responsive image size
                maxHeight: 'auto',
              }}
            />
          </Grid>

          {/* Text and Button on the right side */}
          <Grid item xs={12} md={6} sx={{ marginTop: { xs: 5, md: 10 } }}>
            <Typography variant="body2" sx={{ fontSize: { xs: 18, md: 25 }, marginBottom: 3 }}>
              Lorem ipsum dolor sit amet. Ex fugiat voluptatem est distinctio quia.
            </Typography>

            <Box sx={{ mt: 5, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2DBC91",
                  mr: { xs: 0, md: 7 },
                  textTransform: "none",
                  borderRadius: "21px",
                }}
              >
                Know more
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default EvalSection;

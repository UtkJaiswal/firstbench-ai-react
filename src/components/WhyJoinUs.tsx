import React from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia,Box } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
const Section = () => {

    const cards = [
        {
          title: 'Expert Instructor',
          image:'/Person.png',
          description: 'Empower yourself with the knowledge and skills gained...',
        },
        {
          title: 'Interactive Learning',
          image:'/MonitorPlay.png',
          description: 'Empower yourself with the knowledge and skills gained...',
        },
        {
          title: 'Lifetime Access',
          image:'/LockKeyOpen.png',
          description: 'Empower yourself with the knowledge and skills gained...',
        },
        {
          title: 'Verified Certificate',
          image:'/Certificate.png',
          description: 'Empower yourself with the knowledge and skills gained...',
        },
      ];
    
  return (
    <ThemeProvider theme={theme}>
    <Container style={{padding:20}}>
      <Grid container justifyContent="center" alignItems="center" direction="column" style={{ minHeight: '30vh' }}>
        <Grid item>
          <Typography variant="h4" align="center" gutterBottom>
            Why join Us?
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ boxShadow: 0, border: 1, height: 270, width: '100%',background:'#000000', paddingTop:2,paddingBottom:5,paddingLeft:1.5}} style={{border:"1px solid white"}}>
              <CardMedia
                component="img"
                sx={{objectFit: 'contain',height:'80px',width:'80px' }}
                image={card.image}
                alt={card.title} // Optional: adds alt text for accessibility
              />
              <CardContent>
                <Typography  component="div" align='left' gutterBottom style={{fontWeight:'bold'}}>
                  {card.title}
                </Typography>
                <Typography variant="body1" align='left'>
                  {card.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                  <Typography variant="body1" align='left'>
                    Learn More
                  </Typography>
                  <Box component="img" src="/ArrowRight.png" alt="Arrow" sx={{ ml: 1, height: 20, width: 20 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </ThemeProvider>
  );
};

export default Section;

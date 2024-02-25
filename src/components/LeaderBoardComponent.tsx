import { Grid, Typography } from '@mui/material'
import React from 'react'
import PublicIcon from '@mui/icons-material/Public';

const LeaderBoardComponent = () => {
  return (
    <>
    <Grid container>
      <Grid item xs={2}>
        <PublicIcon/>
      </Grid>
      <Grid item xs={8}> 
        <Typography variant='h6'>Earl John Abaquita</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant='h6'>2000</Typography>
      </Grid>
    </Grid>
    </>
  )
}

export default LeaderBoardComponent
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class ListHeaders extends Component {
  render() {
    return (
        <Grid container spacing={24}>
            <br/>
            <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                    Content
                </Typography>
            </Grid>
            <Grid item xs={4} sm={1}  >
                <Typography variant="body1">
                    Impact
                </Typography>
            </Grid>
            <Grid item xs={4} sm={1}>
                <Typography variant="body1">
                    Ease
                </Typography>
            </Grid>
            <Grid item xs={4} sm={1}>
               <Typography variant="body1">
                    Confidence
                </Typography>
            </Grid>
            <Grid item xs={4} sm={1}>
                <Typography variant="body1">
                    Average
                </Typography>
            </Grid>
      </Grid>
    )
  }
}

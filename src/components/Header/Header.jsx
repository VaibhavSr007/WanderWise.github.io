import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import useStyles from './styles'

export const Header = ({ setCordinates }) => {
    const classes = useStyles();
    const [autoComplete, setAutomplete] = useState(null)
    const onLoad = (autoC) => {
        setAutomplete(autoC);
    }

    const onPlaceChanged = () => {
        const lat = autoComplete.getPlace().geometry.location.lat();
        const lng = autoComplete.getPlace().geometry.location.lng();
        setCordinates({lat,lng});
    }

  return (
    <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
            <Typography variant='h5' className={classes.title}>
                WanderWise
            </Typography>
            <Box display="flex">
                <Typography variant='h6' className={classes.title}>
                    Lets, Explore a Little More
                </Typography>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase placeholder='Search...' classes={{root: classes.inputRoot, input: classes.inputInput }} />
                    </div>
                </Autocomplete>
            </Box> 
        </Toolbar>
    </AppBar>
  )
}

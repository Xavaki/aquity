import * as React from 'react';
import { Toolbar, AppBar, Typography, LinearProgress } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';




const MarkerIcon = props => {
    return (
        <SvgIcon {...props}>
            <svg viewBox="0 0 120.36 149.25" xmlns="http://www.w3.org/2000/svg"><g><path id="svg_1" fill="#d8272d" d="m73.06,13.3c-30.4,0 -57.9,23.3 -57.9,59.4c0,23 17.7,50.1 53.2,81.3c2.8,2.4 6.9,2.4 9.6,0c35.3,-31.2 53.1,-58.3 53.1,-81.3c0,-36 -27.5,-59.4 -58,-59.4zm0,72.5c-8,0 -14.5,-6.5 -14.5,-14.5s6.5,-14.5 14.5,-14.5s14.5,6.5 14.5,14.5s-6.5,14.5 -14.5,14.5z" class="c" /><path stroke="#ffffff" stroke-width="10" id="svg_2" fill={props.color === "red" ? "#db2425" : "#fdae61"} d="m73.06,13.3c-30.4,0 -57.9,23.3 -57.9,59.4c0,23 17.7,50.1 53.2,81.3c2.8,2.4 6.9,2.4 9.6,0c35.3,-31.2 53.1,-58.3 53.1,-81.3c0,-36 -27.5,-59.4 -58,-59.4zm0,72.5c-8,0 -14.5,-6.5 -14.5,-14.5s6.5,-14.5 14.5,-14.5s14.5,6.5 14.5,14.5s-6.5,14.5 -14.5,14.5z" class="c" /><circle id="svg_3" fill="#fff" r="14.5" cy="71.3" cx="73.06" class="b" /></g></svg>
        </SvgIcon>
    )
}

const NavBar = ({ officesLoading }) => {

    return (
        <AppBar position="fixed" color="inherit" sx={{ boxShadow: "0 2px whitesmoke", zIndex: 1400, paddingBottom: 0 }}>
            <Toolbar>
                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <Typography variant='h5' sx={{ color: "rgb(112,112,112)", mt: 1 }}>Aquity (logo)</Typography>
                    <Typography variant='h5' sx={{ color: "rgb(112,112,112)", mt: 1 }}>AB (logo)</Typography>
                </div>
            </Toolbar>
            {officesLoading && <LinearProgress />}
        </AppBar>
    )
}

export default NavBar;
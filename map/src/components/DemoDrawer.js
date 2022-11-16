import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
export default function DemoDrawer({ districtDemoInfo, drawerState, toggleDrawer }) {

    console.log(districtDemoInfo)
    const districtInfo = () => (
        <Box
            sx={{ width: 400, margin: 3, marginTop: 11 }}
            role="presentation"
        >
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <Typography variant='h4'>{districtDemoInfo.properties.NOM_NORMALITZAT}</Typography>
                <CloseRoundedIcon onClick={() => toggleDrawer(false)} sx={{ color: "rgb(112,112,112)" }}>x</CloseRoundedIcon>
            </div>
        </Box>
    );

    return (
        <div style={{ zIndex: 99 }}>
            <React.Fragment key={"left"}>
                <Drawer
                    anchor={"left"}
                    open={drawerState}
                >
                    {districtInfo()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

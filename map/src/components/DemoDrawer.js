import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

export default function DemoDrawer({ drawerContent, drawerState, toggleDrawer }) {

    return (
        <div style={{ zIndex: 99 }}>
            <React.Fragment key={"left"}>
                <Drawer
                    anchor={"left"}
                    open={drawerState}
                >
                    <Box
                        sx={{ width: 400, margin: 3, marginTop: 11 }}
                        role="presentation"
                    >
                        {drawerContent}
                    </Box>
                </Drawer>
            </React.Fragment>
        </div>
    );
}

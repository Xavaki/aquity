import { Box, Typography } from '@mui/material'
import React from 'react'

const SideMenu = () => {

    let menuContent = () => {
        return <Typography variant='h4'
            style={{ paddingBottom: 5 }}
        >
            Menu
        </Typography>
    }
    return (
        <div style={{
            height: "100%",
            width: "400px",
            position: "fixed",
            zIndex: 999,
            marginLeft: 0,
            backgroundColor: "white",
            overflowY: "scroll",
        }}>
            <Box
                sx={{ width: 400, marginTop: 11 }}
                role="presentation"
            >
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 25,
                    paddingTop: 0,
                    // borderBottom: `1px solid ${info.color}`,
                }}>
                    {menuContent()}
                </div>
            </Box>
        </div>
    )
}

export default SideMenu
import { Box, Typography } from '@mui/material'
import FiltreTemporal from './FiltreTemporal'
import React from 'react'
import FiltreBarri from './FiltreBarri'

const SideMenu = ({ sliderValue, changeSliderValue, consColormap }) => {

    let menuContent = () => {
        return (
            <div style={{ width: "80%" }}>
                <Typography variant='h4'
                    style={{
                        paddingBottom: 5,
                        marginBottom: 10,
                    }}
                >
                    Sant Martí
                </Typography>
                <FiltreBarri />
                <FiltreTemporal sliderValue={sliderValue} changeSliderValue={changeSliderValue} />
            </div>)
    }
    return (
        <div style={{
            height: "100%",
            width: "450px",
            position: "fixed",
            zIndex: 999,
            marginLeft: 0,
            backgroundColor: "white",
            overflowY: "scroll",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
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
            <div style={{
                position: "fixed",
                borderRadius: "3%",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                backgroundColor: "white",
                backgroundImage: `linear-gradient(to right, ${consColormap.join(', ')})`,
                width: "300px",
                zIndex: 1000,
                height: "30px",
                top: "80px",
                left: "480px"
            }}>

            </div>
        </div >
    )
}

export default SideMenu
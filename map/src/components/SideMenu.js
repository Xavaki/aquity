import { Box, Tooltip, Typography } from '@mui/material'
import FiltreTemporal from './FiltreTemporal'
import React from 'react'
import FiltreBarri from './FiltreBarri'
import FiltreCategoria from './FiltreCategoria'
import AvgConsum from './AvgConsum'

const SideMenu = ({ sliderValue, changeSliderValue, consColormap, consum2Color, ...props }) => {

    let smcolor = "#00563c";

    let menuContent = () => {
        return (
            <div style={{ width: "100%" }}>
                <div style={{ width: "100%" }}>
                    <Typography variant='h4'
                        style={{
                            paddingBottom: 5,
                            marginBottom: 10,
                            color: smcolor,
                            borderBottom: `1px solid ${smcolor}`,
                        }}
                    >
                        Sant Martí
                    </Typography>
                    <FiltreBarri smcolor={smcolor} />
                    <FiltreTemporal sliderValue={sliderValue} changeSliderValue={changeSliderValue} smcolor={smcolor} />
                    <FiltreCategoria maxRentaRange={props.maxRentaRange} filterByRenta={props.filterByRenta} smcolor={smcolor} />
                </div>
                <AvgConsum
                    consum2Color={consum2Color}
                    avgPatroConsum={props.avgPatroConsum}
                    smcolor={smcolor}
                />
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
            <Tooltip title={Math.round(props.consRange[1])} placement="bottom-end">
                <Tooltip title={props.consRange[0]} placement="bottom-start">
                    <div
                        onMouseEnter={() => console.log("heeeeyya")}
                        style={{
                            position: "fixed",
                            borderRadius: "4px",
                            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                            backgroundColor: "white",
                            backgroundImage: `linear-gradient(to right, ${consColormap.join(', ')})`,
                            width: "300px",
                            zIndex: 1000,
                            height: "20px",
                            top: "80px",
                            left: "480px"
                        }}>

                    </div>
                </Tooltip>
            </Tooltip>
        </div >
    )
}

export default SideMenu
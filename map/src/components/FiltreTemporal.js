import { Slider, Typography } from '@mui/material'
import React from 'react'

const FiltreTemporal = (props) => {
    return (
        <div>
            <Typography variant='body2' style={{
                fontWeight: "bold",
                color: "black",
            }}>
                Filtre temporal
            </Typography>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Typography variant='body1' style={{
                }}>
                    Escala
                </Typography>
                <div style={{
                    paddingLeft: 5,
                    paddingRight: 20,
                    backgroundColor: "whitesmoke",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
                >
                    <Typography variant='body1' style={{
                    }}>
                        24 h
                    </Typography>
                </div>
            </div>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 2,
            }}>
                <Typography variant='body3' style={{
                }}>
                    Time pos.
                </Typography>
                <div style={{
                }}
                >
                    <Typography variant='body3' style={{
                    }}>
                        {props.sliderValue}
                    </Typography>
                </div>
            </div>
            <Slider
                aria-label="time"
                size="small"
                onChangeCommitted={(event, newValue, thumbIndex) => props.changeSliderValue(newValue)}
                style={{
                    width: "100%",
                    marginLeft: 4,
                }}
                marks
                step={1}
                min={1}
                max={24}
            />
        </div>
    )
}

export default FiltreTemporal
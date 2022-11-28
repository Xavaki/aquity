import { Slider, Typography } from '@mui/material'
import React, { useState } from 'react'

const FiltreTemporal = (props) => {

    let [listHidden, setListHidden] = useState(true);

    let timeScales = [
        '1 setmana',
        '2 setmanes',
        '1 mes',
        '1 trimestre',
        '...',
        '...',
        '...',
        '...',
    ]

    return (
        <div>
            <Typography variant='body2' style={{
                fontWeight: "bold",
                color: props.smcolor,
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
                    escala
                </Typography>
                <div>
                    <div style={{
                        paddingLeft: 5,
                        paddingRight: 20,
                        backgroundColor: "whitesmoke",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                        onClick={() => setListHidden(!listHidden)}
                    >
                        <Typography variant='body1' style={{
                        }}>
                            24 h
                        </Typography>
                    </div>
                    <div style={{
                        height: listHidden ? "0px" : "200px",
                        width: "150px",
                        position: "absolute",
                        backgroundColor: "whitesmoke",
                        marginTop: 5,
                        zIndex: 2000,
                        transitionDuration: "0.2s",
                        borderRadius: "4px",
                        transitionProperty: "height",
                        transform: "translate(-60%, 0)",
                        overflowY: "scroll",
                    }}
                        onMouseLeave={() => setListHidden(true)}
                    >
                        {timeScales.map(b => <Typography style={{
                            display: "block",
                            marginTop: 4,
                            marginLeft: 5,
                            color: "rgb(180, 180, 180)"
                        }} variant="body3">{b}</Typography>)}
                    </div>
                </div>
            </div>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 2
            }}>
                <Typography variant='body3' style={{
                }}>
                    time pos.
                </Typography>
                <div>
                    <Typography variant='body3' style={{
                    }}>
                        {props.sliderValue}
                    </Typography>
                </div>
            </div>
            <Slider
                aria-label="time"
                color="santmarti"
                size="small"
                onChangeCommitted={(event, newValue, thumbIndex) => props.changeSliderValue(newValue)}
                style={{
                    width: "100%",
                    marginLeft: 4,
                    zIndex: 1,
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
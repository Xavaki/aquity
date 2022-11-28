import { Typography } from '@mui/material'
import React, { useState } from 'react'

const FiltreBarri = (props) => {


    let [listHidden, setListHidden] = useState(true);

    let barris = ['el Parc i la Llacuna del Poblenou',
        "el Camp de l'Arpa del Clot",
        'la Vila Olímpica del Poblenou',
        'el Clot',
        'el Poblenou',
        'Sant Martí de Provençals',
        'la Verneda i la Pau',
        'el Besòs i el Maresme']

    return (
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
            marginBottom: 15,
        }}>
            <Typography variant='body2' style={{
                fontWeight: "bold",
                color: props.smcolor
            }}>
                Barri
            </Typography>
            <div >
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
                        Tots
                    </Typography>
                </div>
                <div style={{
                    height: listHidden ? "0px" : "150px",
                    width: "250px",
                    position: "absolute",
                    backgroundColor: "whitesmoke",
                    marginTop: 5,
                    transitionDuration: "0.2s",
                    zIndex: 9999,
                    // transitionTimingFunction: "ease-out",
                    borderRadius: "4px",
                    transitionProperty: "height",
                    transform: "translate(-75%, 0)",
                    overflowY: "scroll"
                }}
                    onMouseLeave={() => setListHidden(true)}
                >
                    {barris.map(b => <Typography style={{
                        display: "block",
                        marginTop: 4,
                        marginLeft: 5,
                        color: "rgb(180, 180, 180)"
                    }} variant="body3">{b}</Typography>)}
                </div>
            </div>

        </div>
    )
}

export default FiltreBarri
import { Typography } from '@mui/material'
import React, { useState } from 'react'

const FiltreCategoria = () => {


    let [listHidden, setListHidden] = useState(true);



    return (
        <div style={{
            marginTop: 2,
            marginBottom: 15,
        }}>
            <Typography variant='body2' style={{
                fontWeight: "bold",
                marginBottom: 5,
            }}>
                Filtre categòric
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
                        Cap
                    </Typography>
                </div>
                <div style={{
                    height: listHidden ? "0px" : "200px",
                    width: "80%",
                    position: "absolute",
                    backgroundColor: "whitesmoke",
                    marginTop: 5,
                    zIndex: 2000,
                    transitionDuration: "0.2s",
                    borderRadius: "4px",
                    transitionProperty: "height",
                }}>
                </div>
            </div>

        </div>
    )
}

export default FiltreCategoria
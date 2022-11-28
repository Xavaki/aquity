import { Typography } from '@mui/material'
import React from 'react'
import Chart from './Chart'

const AvgConsum = (props) => {
    return (
        <div style={{
            marginTop: 5,
        }}>
            <Typography variant='body2' style={{
                fontWeight: "bold",
                color: props.smcolor
            }}>
                Patró de consum mitjà
            </Typography>
            <Typography variant='body1' style={{
            }}>
                dels domicilis en pantalla
            </Typography>
            {props.avgPatroConsum.length ?
                <Chart rawData={props.avgPatroConsum} />
                :
                <Typography variant="body3" style={{ marginTop: 10, color: "rgb(180, 180, 180)" }}>No hi ha resultats que coincideixin amb la cerca</Typography>
            }
        </div>
    )
}

export default AvgConsum
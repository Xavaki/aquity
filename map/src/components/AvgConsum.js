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
            <Chart rawData={props.avgPatroConsum} />
        </div>
    )
}

export default AvgConsum
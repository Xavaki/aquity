// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line'
import React from 'react'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
let populateData = () => {
    let values = Array.from(Array(24).keys()).map(key => ({ "x": key, "y": Math.random() * 50, }))
    let curve = [{
        "id": "underlay",
        "color": "rgba(112, 112, 112, 0.2)",
        "data": values
    }]
    let individualPoints = values.map(v => ({
        "id": v.x.toString(),
        "color": "rgb(255, 0, 0)",
        "data": [v]
    }))
    let data = [...curve, ...[individualPoints[1]]]
    console.log(data, individualPoints[0])
    return curve
}
let data = populateData()

const Chart = ({ consum2Color }) => {
    return (< div style={{ position: 'relative' }}>
        <div style={{
            position: 'absolute',
            width: '100%',
            height: '300px',
        }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 10, right: 5, bottom: 20, left: 30 }}
                // margin={0}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                enableArea
                colors={a => a.color}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                // axisBottom={{
                //     orient: 'bottom',
                //     tickSize: 5,
                //     tickPadding: 5,
                //     tickRotation: 0,
                //     legend: 'transportation',
                //     legendOffset: 36,
                //     legendPosition: 'middle'
                // }}
                axisLeft={{
                    orient: 'right',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'consum mitjà',
                    legendOffset: 10,
                    legendPosition: 'middle'
                }}
                pointSize={8}
                // pointColor={(p, pp, ppp) => console.log(p, pp, ppp)}
                // pointBorderWidth={2}
                pointSymbol={e => {
                    // let color = consum2Color(e.datum.y)
                    let color = '#db2425'
                    return <circle cx="0" cy="0" r="4" strokeWidth="0" fill={color} />
                }}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={false}
            />
        </div>
    </div >
    )
}

export default Chart; 
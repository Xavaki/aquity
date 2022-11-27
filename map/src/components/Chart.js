// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line'
import React from 'react'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
let populateData = (rawData) => {
    let values = rawData.map((cons, id) => ({ "x": id + 1, "y": cons, }))
    let curve = [{
        "id": "underlay",
        "color": "rgba(112, 112, 112, 0.3)",
        "data": values
    }]
    // let individualPoints = values.map(v => ({
    //     "id": v.x.toString(),
    //     "color": "rgb(255, 0, 0)",
    //     "data": [v]
    // }))
    // let data = [...curve, ...[individualPoints[1]]]
    // console.log(data, individualPoints[0])
    return curve
}

// FIX 
const interpolate = require('color-interpolate');
let consColormap = ['#1f005c', '#ffb56b'];
let colormap = interpolate(consColormap);
let consum2Color = (cons) => colormap((cons + 10) / 50)

const Chart = (props) => {
    let data = populateData(props.rawData)
    return (< div style={{ position: 'relative' }}>
        <div style={{
            position: 'absolute',
            width: '100%',
            height: '250px',
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
                curve={"basis"}
                axisTop={null}
                axisRight={null}
                lineWidth={0}
                enableGridX={false}
                // axisBottom={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickValues: [1, 4, 7, 10, 13, 16, 19, 22],
                    tickPadding: 5,
                    tickRotation: 0,
                }}
                axisLeft={{
                    orient: 'right',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    // legend: 'consum mitjà',
                    legendOffset: 10,
                    legendPosition: 'middle'
                }}
                pointSize={8}
                // pointColor={(p, pp, ppp) => console.log(p, pp, ppp)}
                // pointBorderWidth={2}
                pointSymbol={e => {
                    return <circle cx="0" cy="0" r="5" strokeWidth="1" stroke="white" fill={consum2Color(e.datum.y)} />
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
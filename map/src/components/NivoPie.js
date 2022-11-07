// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import React from 'react';
import { Typography } from '@mui/material';
import { ResponsivePie } from '@nivo/pie'


export const MyResponsivePie = ({ rawData, keyDecors, normalizer }) => {

    let data = Object.keys(rawData).map(k => ({ "id": k, "label": keyDecors[k].legendLabel, value: normalizer ? Math.round(rawData[k] / normalizer * 100) / 100 : rawData[k], color: keyDecors[k].color }))

    return (
        <>
            <Typography
                color="primary"
                variant="body1"
                style={{
                    margin: 0,
                    marginBottom: 10,
                    marginLeft: 30,
                }}>
                Características de los domicilios (barrio)
            </Typography>
            < ResponsivePie
                data={data}
                colors={{ datum: 'data.color' }}
                margin={{ top: 0, right: 80, bottom: 80, left: 50 }
                }
                innerRadius={0.4}
                padAngle={0.5}
                cornerRadius={1}
                motionConfig="stiff"
                activeOuterRadiusOffset={3}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.2
                        ]
                    ]
                }}
                enableArcLabels={false}
                arcLabelsTextColor="white"
                enableArcLinkLabels={false}
                isInteractive={true}
                legends={[
                    {
                        data: data.slice(0, 6),
                        anchor: 'top-left',
                        direction: 'column',
                        justify: false,
                        translateX: -20,
                        translateY: 0,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemsSpacing: 0,
                        symbolSize: 15,
                        itemDirection: 'left-to-right',
                    },
                    {
                        data: data.slice(6),
                        anchor: 'bottom-left',
                        direction: 'column',
                        justify: false,
                        translateX: -20,
                        translateY: 0,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemsSpacing: 0,
                        symbolSize: 15,
                        itemDirection: 'left-to-right',
                    },
                ]}
            />
        </>)
}

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
// let data =
//     [
//         {
//             "id": "css",
//             "label": "css",
//             "value": 305,
//         },
//         {
//             "id": "scala",
//             "label": "scala",
//             "value": 25,
//         },
//         {
//             "id": "haskell",
//             "label": "haskell",
//             "value": 544,
//         },
//         {
//             "id": "rust",
//             "label": "rust",
//             "value": 288,
//         },
//         {
//             "id": "c",
//             "label": "c",
//             "value": 110,
//         }
//     ]
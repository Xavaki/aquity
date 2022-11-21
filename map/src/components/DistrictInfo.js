import React from 'react'
// import DemoDrawer from './DemoDrawer'
import { Typography, Box } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
var numeral = require('numeral');

// 'Districtes': 'Ciutat Vella',
// '€ per Capita': '15817.8',
// '% Sense Estudis': '0.022',
// '% Estudis primaris': '0.236',
// '% ESO': '0.219',
// '% Batxillerat': '0.204',
// '% Universitat': '0.32',
// 'Casos de Delinqüència': '3172',
// "Casos d'Atur 2019": '7734833',
// "Casos d'Atur 2020": '2106146',
// "Casos d'Atur 2021": '2032854',
// 'Preu de les vivendes (€/m2) 2019': '4506',
// 'Preu de les vivendes (€/m2) 2020': '4476',
// 'Preu de les vivendes (€/m2) 2021': '4303',
// 'Mortalitat (Taxa cada 1000 habitants) 2019': '7.05',
// 'Mortalitat (Taxa cada 1000 habitants) 2020': '8.45',
// 'Mortalitat (Taxa cada 1000 habitants) 2021': '7.75',
// 'Immigració (Taxa cada 1000 habitants) 2019': '160.675',
// 'Immigració (Taxa cada 1000 habitants) 2020': '96.95',
// 'Immigració (Taxa cada 1000 habitants) 2021': '119.3',
// 'Consum Aigua': '1135.206897',
// 'Latitud': '41.3813',
// 'Longitud': '2.1823',

const columns = {
    // 'Districtes': 'Districtes',
    'Consum Aigua': 'Consum (?)',
    '€ per Capita': '€ per Capita',
    'Casos de Delinqüència': 'Casos de Delinqüència',
    '% Sense Estudis': '% Sense Estudis',
    '% Estudis primaris': '% Estudis primaris',
    '% ESO': '% ESO',
    '% Batxillerat': '% Batxillerat',
    '% Universitat': '% Universitat',
    "Casos d'Atur 2019": "Casos d'Atur 2019",
    "Casos d'Atur 2020": "Casos d'Atur 2020",
    "Casos d'Atur 2021": "Casos d'Atur 2021",
    'Preu de les vivendes (€/m2) 2019': 'Preu de les vivendes (€/m2) 2019',
    'Preu de les vivendes (€/m2) 2020': 'Preu de les vivendes (€/m2) 2020',
    'Preu de les vivendes (€/m2) 2021': 'Preu de les vivendes (€/m2) 2021',
    'Mortalitat (Taxa cada 1000 habitants) 2019': 'Mortalitat 2019',
    'Mortalitat (Taxa cada 1000 habitants) 2020': 'Mortalitat 2020',
    'Mortalitat (Taxa cada 1000 habitants) 2021': 'Mortalitat 2021',
    'Immigració (Taxa cada 1000 habitants) 2019': 'Immigració 2019',
    'Immigració (Taxa cada 1000 habitants) 2020': 'Immigració 2020',
    'Immigració (Taxa cada 1000 habitants) 2021': 'Immigració 2021',
    // 'Latitud': 'Latitud',
    // 'Longitud': 'Longitud',
}

let f0 = d => d;
let f1 = d => numeral(d).format('0,0').replace(',', '.');
let fp = d => numeral(d).format('0%');
let fp2 = d => numeral(parseFloat(d) / 1000).format('0%');

const formats = {
    // 'Districtes': 'Districtes',
    '€ per Capita': f1,
    '% Sense Estudis': fp,
    '% Estudis primaris': fp,
    '% ESO': fp,
    '% Batxillerat': fp,
    '% Universitat': fp,
    'Casos de Delinqüència': f1,
    "Casos d'Atur 2019": f1,
    "Casos d'Atur 2020": f1,
    "Casos d'Atur 2021": f1,
    'Preu de les vivendes (€/m2) 2019': f1,
    'Preu de les vivendes (€/m2) 2020': f1,
    'Preu de les vivendes (€/m2) 2021': f1,
    'Mortalitat (Taxa cada 1000 habitants) 2019': fp2,
    'Mortalitat (Taxa cada 1000 habitants) 2020': fp2,
    'Mortalitat (Taxa cada 1000 habitants) 2021': fp2,
    'Immigració (Taxa cada 1000 habitants) 2019': fp2,
    'Immigració (Taxa cada 1000 habitants) 2020': fp2,
    'Immigració (Taxa cada 1000 habitants) 2021': fp2,
    'Consum Aigua': f1,
    // 'Latitud': 'Latitud',
    // 'Longitud': 'Longitud',
}

let sections = {
    'Consum Aigua': 'Dades d\'aigua',
    '€ per Capita': 'Dades demogràfiques',
}

let subsections = {
    '€ per Capita': 'Vàries',
    '% Sense Estudis': 'Educació',
    "Casos d'Atur 2019": "Atur",
    'Preu de les vivendes (€/m2) 2019': 'Preu de les vivendes',
    'Mortalitat (Taxa cada 1000 habitants) 2019': 'Mortalitat',
    'Immigració (Taxa cada 1000 habitants) 2019': 'Immigració',
}

const DistrictInfo = ({ info, open, closeDistrict }) => {

    // info presenter (list - paper - graph - etc.)
    let infoPresenter = () => {
        return (
            <>
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: `1px solid ${info.color}`,
                }}>
                    <Typography variant='h4'
                        style={{ paddingBottom: 5 }}
                        color={info.color}
                    >
                        {info.NOM_NORMALITZAT}
                    </Typography>
                    <CloseRoundedIcon onClick={() => closeDistrict()} sx={{ color: "rgb(112,112,112)", "&:hover": { cursor: "pointer" } }}>x</CloseRoundedIcon>
                </div>
                <div style={{ width: "100%", marginTop: 10 }}>
                    {Object.entries(columns).map(kv => {
                        let [k, v] = kv;
                        return (
                            <>
                                {
                                    sections[k] &&
                                    <Typography
                                        color={info.color}
                                        variant="body1"
                                        style={{
                                            margin: 0,
                                            marginTop: 4,
                                            marginBottom: 5,
                                            fontWeight: "bold",
                                        }}>
                                        {sections[k]}
                                    </Typography>
                                }
                                {
                                    subsections[k] &&
                                    <Typography
                                        // color="primary"
                                        variant="body1"
                                        style={{
                                            margin: 0,
                                            marginTop: 4,
                                            marginBottom: 3,
                                            // fontWeight: "bold",
                                        }}>
                                        {subsections[k]}
                                    </Typography>
                                }
                                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                                    <Typography
                                        variant="body2"
                                        style={{
                                            margin: 0,
                                            paddingLeft: k === "Consum Aigua" ? null : 10
                                        }}>
                                        {v}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        style={{
                                            margin: 0,
                                            // fontWeight: "bold",
                                        }}>
                                        {formats[k](info[k])}
                                    </Typography>
                                </div>
                            </>
                        )
                    })}
                </div>
            </>
        )
    }
    // component presenter (drawer/navbar/etc)
    return (
        <div style={{
            height: "100%",
            width: "400px",
            position: "fixed",
            zIndex: 999,
            marginLeft: open ? 0 : "-400px",
            transitionDuration: "0.2s",
            transitionProperty: "margin-left",
            backgroundColor: "white",
            opacity: 0.9,
            overflowY: "scroll",
            // boxShadow: "2px 0px 4px 20px rgba(0, 0, 0, 0.6)"

        }}>
            <Box
                sx={{ width: 400, marginTop: 11 }}
                role="presentation"
            >
                <div style={{ padding: 25, paddingTop: 0 }}>
                    {infoPresenter()}

                </div>
            </Box>
        </div>
        // <DemoDrawer drawerContent={infoPresenter()} drawerState={districtClicked} toggleDrawer={clickDistrict} />
    )
}

export default DistrictInfo
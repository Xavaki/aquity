import React from 'react'
// import DemoDrawer from './DemoDrawer'
import { Typography, Box } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
var numeral = require('numeral');


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
let f12 = d => numeral(d).format('0,0');
let fp = d => numeral(d).format('0%');
let fp2 = d => numeral(parseFloat(d) / 1000).format('0%');
let fp3 = d => numeral(parseFloat(d) / 1000).format('0%');
let fp4 = (n, d) => numeral(parseFloat(n) / parseFloat(d)).format('0%');
let f10 = d => numeral(parseFloat(d) / 10).format('0,0')
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


const muniSections = {
    "WaterConsumption": "Dades d\'aigua",
    "Population": "Dades demogràfiques",
    "%PrimaryStudies": "Educació (màxim nivell assolit)",
}
const muniColumns = {
    "WaterConsumption": "Consum d'aigua (l)",
    "Population": "Població",
    "PIB": "PIB (milers d'euros per habitant)",
    "FamilyIncome": "Renda familiar (milers d'euros per habitant)",
    "Immigration": "Immigració",
    "Mortality": "Defuncions",
    "Criminality": "Taxa de delinqüència",
    "Unemployment": "Atur",
    "%PrimaryStudies": "Educació primaria",
    "%1stStageESO": "ESO",
    "%2ndStageESO": "Batxillerat",
    "%SuperiorStudies": "Estudis superiors",
}

const muniFormats = {
    "%PrimaryStudies": fp3,
    "%1stStageESO": fp3,
    "%2ndStageESO": fp3,
    "%SuperiorStudies": fp3,
    "Criminality": fp4,
    "FamilyIncome": f10,
    "Immigration": fp4,
    "Mortality": f12,
    "PIB": f10,
    "Population": f12,
    "Unemployment": fp4,
    "WaterConsumption": f12,
}

const ZoneInfo = ({ zone, open, closeDistrict }) => {


    let muniPresenter = () => {
        let info = zone.properties.DEMO_INFO;
        console.log(zone.properties)
        return (
            <>
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: `1px solid ${zone.properties.color}`,
                }}>
                    <Typography variant='h4'
                        style={{ paddingBottom: 5 }}
                        color={zone.properties.color}
                    >
                        {zone.properties.nom_muni}
                    </Typography>
                    <CloseRoundedIcon onClick={() => closeDistrict()} sx={{ color: "rgb(112,112,112)", "&:hover": { cursor: "pointer" } }}>x</CloseRoundedIcon>
                </div>
                <div style={{ width: "100%", marginTop: 10 }}>
                    {Object.entries(muniColumns).map(kv => {
                        let [k, v] = kv;
                        return (
                            <>
                                {
                                    muniSections[k] &&
                                    <Typography
                                        color={info.color}
                                        variant="body1"
                                        style={{
                                            margin: 0,
                                            marginTop: 4,
                                            marginBottom: 5,
                                            fontWeight: "bold",
                                            color: zone.properties.color
                                        }}>
                                        {muniSections[k]}
                                    </Typography>
                                }
                                {/* {
                                    subsections[k] &&
                                    <Typography
                                        // color="primary"
                                        variant="body1"
                                        style={{
                                            margin: 0,
                                            marginTop: 4,
                                            marginBottom: 3,
                                            fontWeight: "bold",
                                        }}>
                                        {subsections[k]}
                                    </Typography>
                                } */}
                                <Typography
                                    variant="body3"
                                    style={{
                                        margin: 0,
                                        // paddingLeft: k === "Consum Aigua" ? null : 10
                                    }}>
                                    {v}
                                </Typography>
                                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                                    <Typography
                                        variant="body3"
                                        style={{
                                            margin: 0,
                                            marginLeft: 15,
                                            // paddingLeft: k === "Consum Aigua" ? null : 10
                                        }}>
                                        2019
                                    </Typography>
                                    <Typography
                                        variant="body3"
                                        style={{
                                            margin: 0,
                                            // fontWeight: "bold",
                                        }}>
                                        {/* {formats[k](info[k])} */}
                                        {muniFormats[k](info["2019"][k], info["2019"]["Population"])}
                                    </Typography>
                                </div>
                                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                                    <Typography
                                        variant="body3"
                                        style={{
                                            margin: 0,
                                            marginLeft: 15,
                                            // paddingLeft: k === "Consum Aigua" ? null : 10
                                        }}>
                                        2020
                                    </Typography>
                                    <Typography
                                        variant="body3"
                                        style={{
                                            margin: 0,
                                            // fontWeight: "bold",
                                        }}>
                                        {/* {formats[k](info[k])} */}
                                        {muniFormats[k](info["2020"][k], info["2020"]["Population"])}
                                    </Typography>
                                </div>
                                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                                    <Typography
                                        variant="body3"
                                        style={{
                                            margin: 0,
                                            marginLeft: 15,
                                            // paddingLeft: k === "Consum Aigua" ? null : 10
                                        }}>
                                        2021
                                    </Typography>
                                    <Typography
                                        variant="body3"
                                        style={{
                                            margin: 0,
                                            // fontWeight: "bold",
                                        }}>
                                        {/* {formats[k](info[k])} */}
                                        {muniFormats[k](info["2021"][k], info["2021"]["Population"])}
                                    </Typography>
                                </div>
                            </>
                        )
                    })}
                </div>
            </>
        )
    }

    // info presenter (list - paper - graph - etc.)
    let districtPresenter = () => {
        let info = zone.properties.info;
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
                                            fontWeight: "bold",
                                        }}>
                                        {subsections[k]}
                                    </Typography>
                                }
                                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                                    <Typography
                                        variant="body3"
                                        style={{
                                            margin: 0,
                                            paddingLeft: k === "Consum Aigua" ? null : 10
                                        }}>
                                        {v}
                                    </Typography>
                                    <Typography
                                        variant="body3"
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
            width: "450px",
            position: "fixed",
            zIndex: 999,
            marginLeft: open ? 0 : "-450px",
            transitionDuration: "0.2s",
            transitionProperty: "margin-left",
            backgroundColor: "white",
            opacity: 0.9,
            overflowY: "scroll",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",

        }}>
            <Box
                sx={{ width: 450, marginTop: 11 }}
                role="presentation"
            >
                <div style={{ padding: 25, paddingTop: 0 }}>
                    {zone.properties.SCONJ_DESC == "Districte" ? districtPresenter() : muniPresenter()}

                </div>
            </Box>
        </div>
        // <DemoDrawer drawerContent={districtPresenter()} drawerState={districtClicked} toggleDrawer={clickDistrict} />
    )
}

export default ZoneInfo
// import React, { useEffect, useRef, useState } from 'react';
// import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import { Grid, Paper, Typography, Item, Stack } from '@mui/material';

// import 'leaflet/dist/leaflet.css';
// import callApi from './api';


// import marker_red_c_location from '../../static/map/images/markers/marker_red_c.svg'
// import marker_gold_c_location from '../../static/map/images/markers/marker_gold_c.svg'
// import { MyResponsivePie } from './NivoPie';
// // import marker_red_location from '../../static/map/images/markers/marker_red.svg'
// // import marker_silver_c_location from '../../static/map/images/markers/marker_silver_c.svg'
// // import marker_gold_location from '../../static/map/images/markers/marker_gold.svg'
// // import marker_evento_location from '../../static/map/images/markers/marker_evento.svg'
// // import marker_pc_location from '../../static/map/images/markers/marker_pc.svg'

// var numeral = require('numeral');


// var IconMarker = L.Icon.extend({
//     options: {
//         iconSize: [35, 40], // size of the icon
//         iconAnchor: null, // point of the icon which will correspond to marker's location
//         popupAnchor: [0, -20] // point from which the popup should open relative to the iconAnchor
//     }
// });


// var redCMarker = new IconMarker({ iconUrl: marker_red_c_location })
// var goldCMarker = new IconMarker({ iconUrl: marker_gold_c_location })
// // var redMarker = new IconMarker({ iconUrl: marker_red_location })
// // var silverCMarker = new IconMarker({ iconUrl: marker_silver_c_location })
// // var goldMarker = new IconMarker({ iconUrl: marker_gold_location })
// // var eventMarker = new IconMarker({ iconUrl: marker_evento_location })
// // var pcMarker = new IconMarker({ iconUrl: marker_pc_location })


// let columns1 = {
//     POBLACION: "población censada",
//     DENSIDAD: "densidad de población (hab/km^2)",
//     PARADOS: "paro",
//     RENTA: "renta per cápita media",
//     EDAD_0_14: "menores de 14",
//     EDAD_15_24: "entre 15 y 24",
//     EDAD_25_64: "entre 25 y 64",
//     EDAD_MAYORES_65: "mayores de 65",
//     NACIDOS_BCN: "nacidos en Barcelona",
//     NACIDOS_RESTO_CAT: "nacidos en el resto de Catalunya",
//     NACIDOS_RESTO_ESP: "nacidos en el resto de España",
//     NACIDOS_EXT: "nacidos en el extranjero",
//     NACIONALIDAD_ESP: "población con nacionalidad española",
//     NACIONALIDAD_EXT: "población con nacionalidad extranjera",
//     FORMACION_TERCER_GRADO: "población con formación de 3r grado",
//     NUM_ANIMAL: "mascotas censadas (distrito)",
// }
// let columns2 = {
//     INTERNET_55_SMARTPHONE: "entre 55 y 64 años",
//     INTERNET_65_SMARTPHONE: "entre 65 y 74 años",
//     INTERNET_75_SMARTPHONE: "mayores de 74 años",
//     INTERNET_55_PC: "entre 55 y 64 años",
//     INTERNET_65_PC: "entre 65 y 74 años",
//     INTERNET_75_PC: "mayores de 74 años",
//     CORREU_55: "entre 55 y 64 años",
//     CORREU_65: "entre 65 y 74 años",
//     CORREU_75: "mayores de 74 años"
// }

// let f0 = d => d;
// let f1 = d => numeral(d).format('0,0').replace(',', '.');
// let fPercentage = d => numeral(d).format('0%');

// let formats = {
//     POBLACION: f1,
//     RENTA: f1,
//     DENSIDAD: f1,
//     PARADOS: fPercentage,
//     EDAD_0_14: fPercentage,
//     EDAD_15_24: fPercentage,
//     EDAD_25_64: fPercentage,
//     EDAD_MAYORES_65: fPercentage,
//     NACIDOS_BCN: fPercentage,
//     NACIDOS_RESTO_CAT: fPercentage,
//     NACIDOS_RESTO_ESP: fPercentage,
//     NACIDOS_EXT: fPercentage,
//     NACIONALIDAD_ESP: fPercentage,
//     NACIONALIDAD_EXT: fPercentage,
//     FORMACION_TERCER_GRADO: fPercentage,
//     NUM_ANIMAL: f1,
//     INTERNET_55_SMARTPHONE: fPercentage,
//     INTERNET_55_PC: fPercentage,
//     CORREU_55: fPercentage,
//     INTERNET_65_SMARTPHONE: fPercentage,
//     INTERNET_65_PC: fPercentage,
//     CORREU_65: fPercentage,
//     INTERNET_75_SMARTPHONE: fPercentage,
//     INTERNET_75_PC: fPercentage,
//     CORREU_75: fPercentage,
// }

// let sections = {
//     POBLACION: "General",
//     EDAD_0_14: "Edad",
//     NACIDOS_BCN: "Nacionalidad",
//     FORMACION_TERCER_GRADO: "Educación",
//     NUM_ANIMAL: "Animales",
//     INTERNET_55_SMARTPHONE: "Acceso a internet via tablet/smartphone",
//     INTERNET_55_PC: "Acceso a internet via ordenador",
//     CORREU_55: "Con correo electrónico",
// }
// let keyColors = ['#00429d', '#3761a9', '#5681b4', '#74a2bc', '#95c3c1', '#bee3c0', '#ffd3bf', '#ffa59e', '#f4777f', '#dd4c65', '#be214d', '#93003a'];

// let caracteristicasDomicilioKeys = {
//     // "TOTAL",
//     "Un hombre solo de 18 a 64 años": {
//         color: keyColors[0],
//         legendLabel: "hombre solo, 18 a 64",
//     },
//     "Una mujer sola de 18 a 64 años": {
//         color: keyColors[1],
//         legendLabel: "mujer sola, 18 a 64",
//     },
//     "Una mujer sola de 65 años y más": {
//         color: keyColors[2],
//         legendLabel: "mujer sola, mayor de 65",
//     },
//     "Un hombre solo de 65 años y más": {
//         color: keyColors[3],
//         legendLabel: "hombre solo, mayor de 65",
//     },
//     "Dos personas de 18 a 64 años": {
//         color: keyColors[4],
//         legendLabel: "2 pers. de 18 a 64",
//     },
//     "Dos personas de 65 años y más": {
//         color: keyColors[5],
//         legendLabel: "2 pers. mayores de 65",
//     },
//     "Dos personas, una de 18 a 64 años de edad y otra de 65 años y más": {
//         color: keyColors[6],
//         legendLabel: "1 pers. de 18 a 64, 1 pers. mayor de 65",
//     },
//     "Dos personas o más, todas mayores de 18 años": {
//         color: keyColors[7],
//         legendLabel: "2 o más pers. mayores de 18",
//     },
//     "Dos personas o más: una mujer de 18 años o más con otras menores de 18 años": {
//         color: keyColors[8],
//         legendLabel: "2 o más pers. mujer mayor de 18, otras menores",
//     },
//     "Dos personas o más: un hombre de 18 años o más con otras menores de 18 años": {
//         color: keyColors[9],
//         legendLabel: "2 o más pers. hombre mayor de 18, otras menores",
//     },
//     "Tres personas o más: dos de 18 años o más y el resto menores de 18 años": {
//         color: keyColors[10],
//         legendLabel: "3 o más pers. 2 mayores de 18, otras menores",
//     },
//     "Otros domicilios con una o más personas menores de 18 años": {
//         color: keyColors[11],
//         legendLabel: "Otros domicilios",
//     },
// };

// let filterObjectByKeys = (obj, keys) => {
//     return Object.keys(obj).
//         filter((key) => keys.includes(key)).
//         reduce((cur, key) => { return Object.assign(cur, { [key]: obj[key] }) }, {});
// }

// const CaixaBankOfficeMarker = ({ infoOffice }) => {

//     let domicilioData = filterObjectByKeys(infoOffice, Object.keys(caracteristicasDomicilioKeys));

//     return (
//         <Marker position={[infoOffice.latitude, infoOffice.longitude]} icon={infoOffice.tipolog === 'ST' ? goldCMarker : redCMarker}>
//             <Popup
//                 className='popup'
//                 maxWidth={1500}
//             >
//                 <Grid container spacing={0}>
//                     <Grid item xs={4} className="">
//                         <div>
//                             <Typography
//                                 style={{
//                                     color: "#0899c2",
//                                     textTransform: "uppercase",
//                                     fontWeight: "bold",
//                                     margin: 0,
//                                 }}>
//                                 {infoOffice.nombre}
//                             </Typography>
//                             <Typography
//                                 style={{
//                                     textTransform: "capitalize",
//                                     margin: 0,
//                                     marginBottom: 6,
//                                     fontSize: 14,
//                                 }}>
//                                 {infoOffice.direccion}
//                                 <br />
//                                 {infoOffice.NOMBRE}
//                                 <br />
//                                 {infoOffice.telefono}
//                             </Typography>
//                         </div>
//                         <Paper
//                             elevation={0}
//                         >
//                             {Object.entries(columns1).map(kv => {
//                                 let [k, v] = kv;
//                                 return (
//                                     <>
//                                         {sections[k] &&
//                                             <Typography
//                                                 color="primary"
//                                                 variant="body1"
//                                                 style={{
//                                                     margin: 0,
//                                                     marginTop: 4,
//                                                     marginBottom: 1,
//                                                 }}>
//                                                 {sections[k]}
//                                             </Typography>
//                                         }
//                                         <div
//                                             style={{
//                                                 marginBottom: 1,
//                                                 display: "flex",
//                                                 justifyContent: "space-between"
//                                             }}>
//                                             <Typography
//                                                 variant="body2"
//                                                 style={{
//                                                     margin: 0
//                                                 }}>
//                                                 {v}
//                                             </Typography>
//                                             <Typography
//                                                 variant="body2"
//                                                 style={{
//                                                     margin: 0,
//                                                     // fontWeight: "bold",
//                                                 }}>
//                                                 {k === 'PARADOS' ? formats[k](infoOffice[k] / infoOffice['POBLACION']) : formats[k](infoOffice[k])}
//                                             </Typography>
//                                         </div>
//                                     </>
//                                 )
//                             })}
//                         </Paper>
//                     </Grid>
//                     <Grid item xs={4}>
//                         <div style={{
//                             height: 600,
//                             width: "100%",
//                         }}>
//                             <MyResponsivePie rawData={domicilioData} keyDecors={caracteristicasDomicilioKeys} normalizer={infoOffice.TOTAL} />
//                         </div>
//                     </Grid>
//                     <Grid item xs={4}>
//                         <Paper
//                             elevation={0}
//                         >
//                             <Typography
//                                 color="primary"
//                                 variant="body1"
//                                 style={{
//                                     margin: 0,
//                                     marginTop: 1,
//                                     marginBottom: 1,
//                                 }}>
//                                 Conocimiento digital (distrito)
//                             </Typography>
//                             {Object.entries(columns2).map(kv => {
//                                 let [k, v] = kv;
//                                 return (
//                                     <>
//                                         {sections[k] &&
//                                             <Typography
//                                                 color="primary"
//                                                 variant="body1"
//                                                 style={{
//                                                     margin: 0,
//                                                     marginTop: 4,
//                                                     marginBottom: 1,
//                                                 }}>
//                                                 {sections[k]}
//                                             </Typography>
//                                         }
//                                         <div
//                                             style={{
//                                                 marginBottom: 1,
//                                                 display: "flex",
//                                                 justifyContent: "space-between"
//                                             }}>
//                                             <Typography
//                                                 variant="body2"
//                                                 style={{
//                                                     margin: 0
//                                                 }}>
//                                                 {v}
//                                             </Typography>
//                                             <Typography
//                                                 variant="body2"
//                                                 style={{
//                                                     margin: 0,
//                                                     // fontWeight: "bold",
//                                                 }}>
//                                                 {formats[k](infoOffice[k])}
//                                             </Typography>
//                                         </div>
//                                     </>
//                                 )
//                             })}
//                         </Paper>
//                     </Grid>
//                 </Grid>
//             </Popup >
//         </Marker >
//     );
// };



// const MapView = ({ setOfficesLoading }) => {

//     const mapRef = useRef();
//     const [isLoading, setLoading] = useState(false);
//     let [caixaBankOffices, setCaixaBankOffices] = useState([])
//     useEffect(() => {
//         if (!isLoading) { setLoading(true) }
//         if (mapRef.current) {

//             const fetchData = async () => {
//                 const APIData = await callApi("api/offices/", "GET")
//                 setCaixaBankOffices(APIData)
//                 setLoading(false)
//                 setOfficesLoading(false)
//             }
//             fetchData()
//         }
//     }, []);

//     return (
//         <>
//             <Map
//                 ref={mapRef}
//                 style={{ width: "100%", height: "100%" }}
//                 center={{ lat: "41.387040", lng: " 2.170115" }}
//                 zoom={14}
//                 minZoom={12}
//                 zoomControl={false}
//             >
//                 <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
//                     url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
//                 />
//                 {caixaBankOffices?.map((cbo) => (
//                     <CaixaBankOfficeMarker infoOffice={cbo} />
//                 ))}
//             </Map>
//         </>
//     )
// }

// export default MapView;
import React, { useEffect, useRef, useState } from 'react';
import { TileLayer, GeoJSON, MapContainer, useMapEvent, Marker, Popup } from 'react-leaflet';
// import { useMapEvent } from 'react-leaflet/hooks'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import callApi from './api';
import SideMenu from './SideMenu';
import { zip } from 'underscore'
import Chart from './Chart';
import { Typography } from '@mui/material';

const interpolate = require('color-interpolate');
let consColormap = ['#1f005c', '#ffb56b'];
let colormap = interpolate(consColormap);



// https://stackoverflow.com/questions/23567203/leaflet-changing-marker-color
const markerHtmlStyles = (color, visibility) => `
  background-color: ${color};
  width: 0.5rem;
  height: 0.5rem;
  display: ${visibility};
  margin: 0;
  position: relative;
  border-radius: 100%;
  border: none`

const icon = (color, visibility) => L.divIcon({
    className: "my-custom-pin",
    iconAnchor: [0, 0],
    labelAnchor: [0, 0],
    popupAnchor: [4, 0],
    html: `<span style="${markerHtmlStyles(color, visibility)}" />`
})


const palette = ['#19439c', '#4f7cb6', '#61a0c4', '#5ea9c6', '#4898bc', '#b1d2b2', '#71aa8b', '#3f886b', '#176d51', '#00563c']

function SetViewOnClick({ }) {
    const map = useMapEvent('click', (e) => {
        map.setView(e.latlng, map.getZoom(), {
            animate: true,
        })
    })
    return null
}

const MapSynthetic = ({ setSynthDataLoadning }) => {

    const nbhData = () => {
        neighborhoods.forEach((d, id) => {
            d.properties["color"] = palette[id]
        })
        return neighborhoods.map((data, id) =>
            <GeoJSON
                data={data}
                id={id}
                key={id}
                // color={data.properties.color}
                color={"black"}
                weight={0}
                fillOpacity={0.05}
            />
        )
    }


    let consum2Color = (cons) => colormap((cons + 10) / consRange[1])

    let barrid2Visibility = barrID => {
        let barriRenta = barris[parseFloat(barrID)].RENTA
        return (barriRenta >= filteredRentaRange[0] && barriRenta <= filteredRentaRange[1]) ? "block" : "none"
    }

    let filteredHouseholds = (households) => {
        let rentaRangeFiltered = households.filter(hh => {
            let barrID = parseInt(hh.properties.BARRI);
            let barriRenta = barris[barrID].RENTA
            return (barriRenta >= filteredRentaRange[0] && barriRenta <= filteredRentaRange[1])
        })
        console.log(rentaRangeFiltered.length)
        return rentaRangeFiltered
    }

    const hhData = () => {
        return households.features.map((data, id) => {
            let consum = data.properties.patro_consum[timeStep - 1]
            return (
                < Marker position={data.geometry.coordinates.reverse()} icon={icon(consum2Color(consum), barrid2Visibility(data.properties.BARRI))}>
                    <Popup maxWidth={1000}>
                        <div style={{ width: "400px", height: "300px", backgroundColor: "white" }}>
                            <Typography variant="body3">(adreça)</Typography>
                            <br></br>
                            <Typography variant="body3">{data.properties.NOM_BARRI}, Sant Martí</Typography>
                            <br></br>
                            <Typography variant="body3" style={{ fontWeight: "bold" }}>consum total diari (l): {data.properties.total_cons}</Typography>
                            <Chart rawData={data.properties.patro_consum} height={"200px"} width={"300px"} />
                        </div>
                    </Popup>
                </Marker>
            )
        }
        )
    }

    const mapRef = useRef();

    const [isLoading, setLoading] = useState(false);
    const [districts, setDistricts] = useState([])
    const [neighborhoods, setNeighborhoods] = useState([])
    const [households, setHouseholds] = useState([])
    const [barris, setBarris] = useState({})
    const [maxRentaRange, setMaxRentaRange] = useState([]);
    const [filteredRentaRange, setFilteredRentaRange] = useState([])
    const [consRange, setConsRange] = useState([])
    const [timeStep, setTimeStep] = useState(1)

    let [testColor, setTestColor] = useState('#db2425')

    const [apiLoaded, setApiLoaded] = useState(false);

    useEffect(() => {
        if (!isLoading) { setLoading(true) }
        // if (mapRef.current) {
        const fetchData = async () => {
            const APIData = await callApi("api/data/", "GET")
            let dist_geojson = APIData.dist_geojson;
            let hh_geojson = APIData.hh_geojson;
            let neighborhoods = dist_geojson.features.filter(f => f.properties.SCONJ_DESC === "Barri")
            let others = APIData.others;
            let districts = dist_geojson.features.filter(f => f.properties.SCONJ_DESC === "Districte")
            let households = hh_geojson;
            let barris = APIData.barris;
            let { minc, maxc } = others;

            setDistricts(districts)
            setNeighborhoods(neighborhoods)
            setHouseholds(households)
            setBarris(barris)
            setConsRange([minc, maxc])

            let barrioRentas = Object.keys(barris).map(bid => parseInt(barris[bid].RENTA))
            let maxRentaRange = [Math.min(...barrioRentas), Math.max(...barrioRentas)]
            setMaxRentaRange(maxRentaRange)
            setFilteredRentaRange(maxRentaRange)


            console.log(households)

            setLoading(false)
            setSynthDataLoadning(false)
            setApiLoaded(true);
        }
        fetchData()
        // }
    }, []);


    var avgEmAll = function (arrays) {
        // zip with array of arrays https://stackoverflow.com/a/10394791/327074
        return zip.apply(null, arrays).map(avg)
    }

    // average an array https://stackoverflow.com/a/10624256/327074
    var avg = function (x) {
        return x.reduce(function (y, z) { return Number(y) + Number(z) }) / x.length
    }

    let computeAvgPatroConsum = (households) => {
        let all_patrons = households.map(f => f.properties.patro_consum);
        return avgEmAll(all_patrons);
    }

    let [sliderValue, setSliderValue] = useState(1);
    const chooseTimeStep = (newValue) => {
        setSliderValue(newValue);
        setTimeStep(newValue);
    };

    let filterByRenta = newValue => {
        setFilteredRentaRange(newValue)
        // computeAvgPatroConsum(filteredHouseholds())
    }

    return (
        <>
            {/* <div style={{
                position: "fixed",
                backgroundColor: "tan",
                width: "200px",
                zIndex: 1000,
                height: "30px",
                top: "90px",
                left: "220px"
            }}>

            </div> */}
            {apiLoaded && <SideMenu
                sliderValue={sliderValue}
                changeSliderValue={chooseTimeStep}
                consColormap={consColormap}
                consum2Color={consum2Color}
                avgPatroConsum={computeAvgPatroConsum(filteredHouseholds(households.features))}
                maxRentaRange={maxRentaRange}
                filterByRenta={filterByRenta}
            />}
            <MapContainer
                // ref={mapRef}
                style={{ width: "100%", height: "100%" }}
                center={{ lat: "41.387040", lng: " 2.170115" }}
                zoom={14}
                minZoom={12}
                zoomControl={false}
            >
                <TileLayer
                    attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=Py8yDz4u4TMlCiAXlJOh9DCN06nX8CoNg3KXUJeF7zVUygcVdfVcFyUvqYGFI74J'
                />
                {apiLoaded && nbhData()}
                {apiLoaded && hhData()}
                <SetViewOnClick />
            </MapContainer>
        </>
    )
}

export default MapSynthetic;

// https://leaflet-extras.github.io/leaflet-providers/preview/
import React, { useEffect, useRef, useState } from 'react';
import { TileLayer, GeoJSON, MapContainer, useMapEvent, Marker } from 'react-leaflet';
// import { useMapEvent } from 'react-leaflet/hooks'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import callApi from './api';
import SideMenu from './SideMenu';

const interpolate = require('color-interpolate');
let consColormap = ['#1f005c', '#ffb56b'];
let colormap = interpolate(consColormap);



// https://stackoverflow.com/questions/23567203/leaflet-changing-marker-color
const markerHtmlStyles = color => `
  background-color: ${color};
  width: 0.5rem;
  height: 0.5rem;
  display: block;
  margin: 0;
  position: relative;
  border-radius: 100%;
  border: none`

const icon = (color) => L.divIcon({
    className: "my-custom-pin",
    iconAnchor: [0, 0],
    labelAnchor: [0, 0],
    popupAnchor: [0, 0],
    html: `<span style="${markerHtmlStyles(color)}" />`
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

    const hhData = () => {
        return households.features.map((data, id) => {
            let consum = data.properties.patro_consum[timeStep - 1]
            return < Marker position={data.geometry.coordinates.reverse()} icon={icon(consum2Color(consum))} />
        }
        )
    }

    const mapRef = useRef();

    const [isLoading, setLoading] = useState(false);
    const [districts, setDistricts] = useState([])
    const [neighborhoods, setNeighborhoods] = useState([])
    const [households, setHouseholds] = useState([])

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
            let households = hh_geojson
            let { minc, maxc } = others;

            setDistricts(districts)
            setNeighborhoods(neighborhoods)
            setHouseholds(households)
            setConsRange([minc, maxc])

            setLoading(false)
            setSynthDataLoadning(false)
            setApiLoaded(true);
        }
        fetchData()
        // }
    }, []);

    let [sliderValue, setSliderValue] = useState(1);
    const chooseTimeStep = (newValue) => {
        setSliderValue(newValue);
        setTimeStep(newValue);
    };

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
            <SideMenu sliderValue={sliderValue} changeSliderValue={chooseTimeStep} consColormap={consColormap} consum2Color={consum2Color} />
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
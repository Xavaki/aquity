import React, { useEffect, useRef, useState } from 'react';
import { Map, TileLayer, GeoJSON, coordsToLatLng } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import callApi from './api';
import DemoDrawer from './DemoDrawer'


const palette = ['#19439c', '#4f7cb6', '#61a0c4', '#5ea9c6', '#4898bc', '#b1d2b2', '#71aa8b', '#3f886b', '#176d51', '#00563c']

const distIds = {
    1: 'Ciutat Vella',
    2: 'Eixample',
    3: 'Sants-Montjuïc',
    4: 'Les Corts',
    5: 'Sarrià-Sant Gervasi',
    6: 'Gràcia',
    7: 'Horta-Guinardó',
    8: 'Nou Barris',
    9: 'Sant Andreu',
    10: 'Sant Martí',
}


const District = ({ id, data, demodata, style, onClick }) => {
    console.log(data)
    return <GeoJSON
        key={id}
        data={data}
        color={palette[id]}
        onClick={() => onClick()}
    />
}

const MapView = ({ setOfficesLoading }) => {

    const [drawerState, setDrawerState] = useState(false);

    const toggleDrawer = (open) => {
        setDrawerState(open);
    };
    const data = () => {
        districts.forEach(d => {
            d.properties["NOM_NORMALITZAT"] = distIds[d.id]
            d.properties.info = districtsInfo[d.id]
        })
        return districts.map((distData, id) => <District
            data={distData}
            id={id}
            onClick={() => {
                toggleDrawer(true)
                setSelectedDistrict(id)
            }}
        />)
    }

    const mapRef = useRef();
    const [isLoading, setLoading] = useState(false);
    const [districts, setDistricts] = useState([])
    const [districtsInfo, setDistrictsInfo] = useState({})
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const [apiLoaded, setApiLoaded] = useState(false);
    useEffect(() => {
        if (!isLoading) { setLoading(true) }
        if (mapRef.current) {

            const fetchData = async () => {
                const APIData = await callApi("api/data/", "GET")
                setDistricts(APIData.geojson.features.filter(f => f.properties.SCONJ_DESC === "Districte"))
                setDistrictsInfo(APIData.dist_info)
                setLoading(false)
                setOfficesLoading(false)
                setApiLoaded(true);
            }
            fetchData()
        }
    }, []);

    return (
        <>
            {selectedDistrict !== null && <DemoDrawer districtDemoInfo={districts[selectedDistrict]} drawerState={drawerState} toggleDrawer={toggleDrawer} />}
            <Map
                ref={mapRef}
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
                {apiLoaded && data()}
            </Map>
        </>
    )
}

export default MapView;

// https://leaflet-extras.github.io/leaflet-providers/preview/
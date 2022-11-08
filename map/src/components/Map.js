import React, { useEffect, useRef, useState } from 'react';
import { Map, TileLayer, GeoJSON, coordsToLatLng } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import callApi from './api';


const MapView = ({ setOfficesLoading }) => {

    const data = () => {
        return <GeoJSON
            key={0}
            data={polygonsData}
        // filter={f => f.id === 2}
        // onEachFeature={(f, l) => console.log(f)}
        />
    }

    const mapRef = useRef();
    const [isLoading, setLoading] = useState(false);
    const [polygonsData, setPolygonsData] = useState([]);
    const [apiLoaded, setApiLoaded] = useState(false);
    useEffect(() => {
        if (!isLoading) { setLoading(true) }
        if (mapRef.current) {

            const fetchData = async () => {
                const APIData = await callApi("api/polygons/", "GET")
                setPolygonsData(APIData)
                setLoading(false)
                setOfficesLoading(false)
                setApiLoaded(true);
            }
            fetchData()
        }
    }, []);

    return (
        <>
            <Map
                ref={mapRef}
                style={{ width: "100%", height: "100%" }}
                center={{ lat: "41.387040", lng: " 2.170115" }}
                zoom={14}
                minZoom={12}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                {apiLoaded && data()}
            </Map>
        </>
    )
}

export default MapView;
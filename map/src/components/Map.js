import React, { useEffect, useRef, useState } from 'react';
import { TileLayer, GeoJSON, MapContainer, useMapEvent } from 'react-leaflet';
// import { useMapEvent } from 'react-leaflet/hooks'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import callApi from './api';
import ZoneInfo from './ZoneInfo';
import { select } from 'underscore';

const palette = ['#19439c', '#4f7cb6', '#61a0c4', '#5ea9c6', '#4898bc', '#b1d2b2', '#00563c', '#3f886b', '#176d51', '#71aa8b']
const muniPalette = ['#94003a', '#900c46', '#8b1551', '#851b5d', '#7f2169', '#772676', '#6e2b82'];

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
    return (
        <>
            <GeoJSON
                key={id}
                data={data}
                color={data.properties.info.color}
                weight={1}
                // fillOpacity={}
                onEachFeature={(feature, layer) => {
                    layer.on({
                        click: () => {
                            onClick()
                        }
                    })
                }}
            />
        </>
    )
}

function SetViewOnClick({ }) {
    const map = useMapEvent('click', (e) => {
        map.setView(e.latlng, map.getZoom(), {
            animate: true,
        })
    })
    return null
}

const MapView = ({ setOfficesLoading }) => {

    const [districtClicked, setClickedZone] = useState(false);

    const clickZone = (open) => {
        setClickedZone(open);
    };

    const data = () => {
        districts.forEach(d => {
            d.properties.info = districtsInfo[d.id]
            d.properties.info["NOM_NORMALITZAT"] = distIds[d.id]
            d.properties.info["color"] = palette[parseInt(d.id) - 1]
        })
        return districts.map((distData, id) =>
            <District
                data={distData}
                id={id}
                onClick={() => {
                    clickZone(true)
                    setSelectedZone(id)
                }}
            />
        )
    }
    const muniData = () => {
        municipis.forEach(muni => {
            muni.properties["color"] = muniPalette[muni.properties.MUNI_ID - 11]
        })
        return municipis.map((data, id) => {
            return (
                <GeoJSON
                    key={id}
                    data={data}
                    color={data.properties.color}
                    weight={1}
                    // fillOpacity={}
                    onEachFeature={(feature, layer) => {
                        layer.on({
                            click: () => {
                                clickZone(true)
                                setSelectedZone(data.properties.MUNI_ID)
                            }
                        })
                    }}
                />
            )
        }
        )
    }

    const mapRef = useRef();
    const [isLoading, setLoading] = useState(false);
    const [districts, setDistricts] = useState([])
    const [municipis, setMunicipis] = useState([])
    const [districtsInfo, setDistrictsInfo] = useState({})
    const [selectedZone, setSelectedZone] = useState(null)
    const [apiLoaded, setApiLoaded] = useState(false);
    useEffect(() => {
        if (!isLoading) { setLoading(true) }
        // if (mapRef.current) {
        const fetchData = async () => {
            const APIData = await callApi("api/data/", "GET")

            let muniInfo = APIData.muni_info


            setMunicipis(muniInfo.features.sort((a, b) => (a.properties.MUNI_ID > b.properties.MUNI_ID ? 1 : -1)));

            setDistricts(APIData.geojson.features.filter(f => f.properties.SCONJ_DESC === "Districte"))
            setDistrictsInfo(APIData.dist_info)
            setLoading(false)
            setOfficesLoading(false)
            setApiLoaded(true);
        }
        fetchData()
        // }
    }, []);


    const getSelectedZone = () => {
        return selectedZone >= districts.length ? municipis[selectedZone - 11] : districts[selectedZone]
    }

    return (
        <>
            {selectedZone !== null &&
                <ZoneInfo zone={getSelectedZone()} open={districtClicked} closeDistrict={() => clickZone(false)} />
            }
            <MapContainer
                // ref={mapRef}
                style={{ width: "100%", height: "100%" }}
                center={{ lat: "41.387040", lng: " 2.170115" }}
                zoom={11}
                minZoom={11}
                zoomControl={false}
            >
                <TileLayer
                    attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=Py8yDz4u4TMlCiAXlJOh9DCN06nX8CoNg3KXUJeF7zVUygcVdfVcFyUvqYGFI74J'
                />
                {apiLoaded && data()}
                {apiLoaded && muniData()}
                <SetViewOnClick />
            </MapContainer>
        </>
    )
}

export default MapView;

// https://leaflet-extras.github.io/leaflet-providers/preview/
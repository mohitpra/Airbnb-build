import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import getCenter from "geolib/es/getCenter";

function Map({searchResults}) {
  
    const [selectedLocation, setSelectedLocation] = useState({});

    const coordinates = searchResults.map(res => ({
        longitude: res.long,
        latitude: res.lat,
    }));

    const center = getCenter(coordinates);
    
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 8,
    });

    return (
        <ReactMapGL mapStyle='mapbox://styles/mohit-123321123/cksoznjelc1pa17ocm7nvyc16'
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewport => setViewport(nextViewport))}
        >
            {searchResults.map( res => (
                <div key={res.long}>
                    <Marker longitude={res.long} latitude={res.lat} offsetLeft={-20} offsetTop={-10}>
                        <p role="img" onClick={() => setSelectedLocation(res)} className="cursor-pointer text-2xl animate-bounce"
                        aria-label="push-pin">📍</p>
                    </Marker>
                    {selectedLocation.long === res.long ? (
                        <Popup onClose={() => setSelectedLocation({})}
                        closeOnClick={true}
                        latitude={res.lat}
                        longitude={res.long}>
                            {res.title}
                        </Popup>
                    ) : (false)}
                </div>
            ))}

        </ReactMapGL>
    )
}

export default Map

import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoidmVyYXpvdSIsImEiOiJjbGdhMDkyZHMwOThiM2RwZ256bWR0dm9hIn0.f-631-O5UNmKOOF1svxxzQ';
// mapboxgl.accessToken = 'sk.eyJ1IjoidmVyYXpvdSIsImEiOiJjbGdhYzlrdzAwZmt3M3JxaTduc2ZwZjVxIn0.-AFSvCZuoSl1s5_HgZhWhA';


export default function App() {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(-122.33);
	const [lat, setLat] = useState(47.61);
	const [zoom, setZoom] = useState(9);

	// Initialize
	useEffect(() => {
	    if (map.current) return; // initialize map only once
	    map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lng, lat],
			zoom: zoom,
			maxBounds: [[-124.763068, 45.543541],[-116.915989, 49.002494]],
	    });

	    map.current.on('load', () => {
	    	map.current.addSource('trees-source', {
		      type: 'vector',
		      url: 'mapbox://verazou.seattletrees', 
	    	});

		    map.current.addLayer(
		      {
		        id: 'trees',
		        type: 'circle',
		        source: 'trees-source',
		        'source-layer': 'trees',
		        layout: {
		        },
		      },
		    );
	    });

	  });

	// Store new coordinates
	useEffect(() => {
	if (!map.current) return; // wait for map to initialize
		map.current.on('move', () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});
	});



	return (
		<div>
			<div className="sidebar">
				Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
			</div>
			<div ref={mapContainer} className="map-container" />
		</div>
	);
}


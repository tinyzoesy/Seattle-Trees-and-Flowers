import React, { useRef, useEffect, useState } from 'react';
import Filters from './Filters';
import {layers} from "./Labels";

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoidmVyYXpvdSIsImEiOiJjbGdhMDkyZHMwOThiM2RwZ256bWR0dm9hIn0.f-631-O5UNmKOOF1svxxzQ';
// mapboxgl.accessToken = 'sk.eyJ1IjoidmVyYXpvdSIsImEiOiJjbGdhYzlrdzAwZmt3M3JxaTduc2ZwZjVxIn0.-AFSvCZuoSl1s5_HgZhWhA';


export default function App() {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(-122.33);
	const [lat, setLat] = useState(47.61);
	const [zoom, setZoom] = useState(9);
	const [selectedFlower, setSelectedFlower] = useState("seattle-plum");

	// Initialize
	useEffect(() => {
		console.log("useEffected", selectedFlower);
	    if (!map.current) {
		    map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/verazou/clgx862e7004901r663j98270',
				center: [lng, lat],
				zoom: zoom,
				maxBounds: [[-124.763068, 45.543541],[-116.915989, 48.946000]],
		    });
		}

	    // map.current.on('load', () => {
	    //     map.current.addSource('flower-source', {
		//       type: 'vector',
		//       url: 'mapbox://verazou.seattleflowerswithicons', 
		//       cluster: true,
		//       clusterMaxZoom: 14,
		//       clusterRadius: 100
		//     });

		//     map.current.addLayer({
		//       id: 'clusters',
		//       type: 'circle',
		//       source: 'flower-source',
		//       'source-layer': 'flowers',
		//       filter: ['has', 'point_count'],
		//       paint: {
		//         'circle-color': '#51bbd6',
		//         'circle-radius': 2,
		//         'circle-translate': [-15, -15],
		//       },
	    // 	});
	    // });

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

	useEffect(() => {
    	map.current.on('idle', () => {
	    	console.log("idle");
			if (!map.current) return; // wait for map to initialize
		    for (let layer of layers) {
				if (layer.id !== selectedFlower) {
		    		map.current.setLayoutProperty(layer.id, 'visibility', 'none');
		    	} else {
		    		map.current.setLayoutProperty(layer.id, 'visibility', 'visible');
	    		}
	    	}
	    });
	}, [selectedFlower]);

	const onFilterChange = (event, id) => {
		console.log(id);
		setSelectedFlower(id)
	};

	const info = <div className="sidebar">
				Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
			</div>;

	return (
		<div>
			<div>
				<Filters map={map} onChange={onFilterChange}/>
			</div>
			<div ref={mapContainer} className="map-container" />
		</div>
	);
}


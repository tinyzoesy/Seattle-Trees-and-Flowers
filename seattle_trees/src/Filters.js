import React, { useRef, useEffect, useState } from 'react';
import { FormControl } from '@mui/base';
import { FormControlLabel } from '@mui/material';
import { FormLabel } from '@mui/material';
import { Radio } from '@mui/material';
import { RadioGroup } from '@mui/material';
import {layers} from "./Labels";
import Button from '@mui/base/Button';
import { Select } from '@mui/base';
import { MenuItem } from '@mui/material';
import { InputLabel } from '@mui/material';
import { SvgIcon } from '@mui/material';
import {ReactComponent as Plum} from './plum.svg';
import { IconButton } from '@mui/material';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

export default function Filters({ map, onChange }) {
	const [showAllOptions, setShowAllOptions] = useState(false);
	const [selectedOption, setSelectedOption] = useState("seattle-plum");
	const radio = <Radio 
		 sx={{
		    color: '#6f924b',
		    '&.Mui-checked': {
		      color: '#6f924b',
		    },
		    '& .MuiSvgIcon-root': {
		      fontSize: 16,
		    },
		    '&.PrivateSwitchBase-input': {
		    	padding: 8,
		    },
		 }}
	/>;
	let group;
	let buttonLabel;
	// if (showAllOptions) {
		 group = layers.map((layer, index) => {
		 	const label = <div className="option">{layer.icon}<div className="option-text">{layer.name}</div></div>;
		 	return <FormControlLabel value={layer.id} control={radio} label={label} key={layer.id}/>
		 });
		 buttonLabel = "Hide options";
	// } else {
	// 	 group = layers.map((layer, index) => {
	// 	 	if (layer.id === selectedOption) {
	// 	 		const label = <div className="option">{layer.icon}<div className="option-text">{layer.name}</div></div>;
	// 	 		return <FormControlLabel value={layer.id} control={radio} label={label} key={layer.id}/>;
	// 	 	} else {
	// 	 		return null;
	// 	 	}
	// 	 });
	// 	 buttonLabel = "See all options";
	// }
	const handleChange = (event, id) => {
		setShowAllOptions(false);
		setSelectedOption(id);
		onChange(event, id);
	};
	const radioGroup = <RadioGroup
	    aria-labelledby="demo-radio-buttons-group-label"
	    defaultValue="seattle-plum"
	    name="radio-buttons-group"
	    onChange={handleChange}
	    value={selectedOption}
	  >
	  	{group}
	  </RadioGroup>;
	const select = layers.map((layer, index) => <MenuItem value={layer.id} key={layer.id}>{layer.name}</MenuItem>);
	const selectGroup = <Select
	    id="demo-simple-select"
	    label="Flower type"
	    defaultValue="seattle-plum"
	 >{select}</Select>;
	const form = <FormControl>
			<InputLabel id="demo-simple-select-standard-label">Flower type</InputLabel>
		  	{selectGroup}
		</FormControl>;
	const [showComponent, setShowComponent] = useState(true);

  const handleClick = () => {
    setShowAllOptions(!showAllOptions);
  }

	let width = window.innerWidth;
	if (width > 768) {
		return <div className="filter-wrapper" ><div className="filter-container">
				<div className="filter-title">Explore flower trees in Seattle</div>
				  {radioGroup}
			</div></div>;
	} else {
		let icon;
		for (let layer of layers) {
			if (layer.id === selectedOption) {
				const onClickButton = () => {setShowAllOptions(!showAllOptions)}
				icon = <IconButton className="icon-button"   sx={{
				    backgroundColor: '#c7d1be',
				    "&:hover": { backgroundColor: "#b9c9ab" },
				  }} onClick={onClickButton}>
				  {layer.icon}
				</IconButton>;
			}
		}
		if (showAllOptions) {
			return <div>{icon}
			<div className="filter-wrapper" >
			 <div className="filter-container relative-container">
				<div className="filter-title">Explore flower trees in Seattle</div>
				  {radioGroup}
			</div></div></div>;
		} else {
			return icon;
		}
	}
}
import React, { useState, Component } from "react";
import Map from 'ol/Map';
import Slider from '@material-ui/core/Slider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import XYZ from 'ol/source/XYZ';
import SourceOSM from "ol/source/OSM.js";
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import * as proj from 'ol/proj';
import * as geom from 'ol/geom';
import 'ol/ol.css';
import Typography from '@material-ui/core/Typography';

// center of new map
const posBerlin = proj.fromLonLat([7.99, 16.96]);

function valuetext(value) {
  return `${value}°C`;
}

// Setup base component for app
class OlMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [0,100],
        }

        this.map = new Map({
            target: null,
            layers: [
                new TileLayer({
                        source: new SourceOSM()
                }),
                new LayerVector({
                    source: new SourceVector({
                        features: this.props.points
                    })
                })
            ],
            view: new View({
                center: posBerlin,
                zoom: 2
            })
        });

        this.setValue = this.setValue.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCountryChange = this.handleCountryChange.bind(this)
        this.updateMap = this.updateMap.bind(this)
    }

    updateMap() {
        this.map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new SourceOSM()
                }),
                new LayerVector({
                    source: new SourceVector({
                        features: this.props.points
                    })
                })
            ],
            view: new View({
                center: posBerlin,
                zoom: 2
            })
        });
    }

    setValue(newValue) {
        this.setState({value: newValue})
    }

    handleChange = (event, newValue) => {
        this.setValue(newValue)
    }

    handleCountryChange = (event) => {
        this.props.setFilterDict({"recipient_country":event.target.value})
    }

    // Mounting stuff
    componentDidMount() {
        this.map.setTarget("map");
    }

    componentWillUnmount() {
        this.map.setTarget(null);
    }

    componentDidUpdate(prevProps) {
        if (this.props.points != prevProps.points) {
            this.map.setTarget(null);
            this.updateMap();
            this.map.setTarget("map");
        }
    }

    render() {
        return (
            <div>
                <div id="map" className="map" style={{ width: "100%", height: "600px" }}/>

                <Typography variant="h6" gutterBottom>
                Set Range for Budget Size
                </Typography>
                <Slider
                    value={this.state.value}
                    onChange={this.handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    marks={true}
                />

                <Typography variant="h6" gutterBottom>
                Select some other shit
                </Typography>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Select Country</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={50}
                        onChange={this.handleCountryChange}
                    >
                        {this.props.uniqueCountries.map((item) =>
                            <MenuItem value={item}>{item}</MenuItem>
                        )}
                   </Select>
                </FormControl>
             </div>
        );
    }
}

export default OlMap;

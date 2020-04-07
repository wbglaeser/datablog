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
            value: [
                this.props.rangeBudget["lower_bound"],
                this.props.rangeBudget["upper_bound"]
            ],
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
        this.handleSliderChange = this.handleSliderChange.bind(this)
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

    handleSliderChange = (event, newValue) => {
        const newDict = {...this.props.filter_dict};
        newDict["budget"] = {};
        newDict["budget"]["type"]="range";
        newDict["budget"]["lower_bound"]=newValue[0]
        newDict["budget"]["upper_bound"]=newValue[1]
        this.setValue(newValue);
        this.props.setFilterDict(newDict);
    }

    handleCountryChange = (event) => {
        const newDict = {...this.props.filter_dict};
        newDict["recipient_country"] = {};
        newDict["recipient_country"]["type"]="value";
        newDict["recipient_country"]["value"]=event.target.value;
        this.props.setFilterDict(newDict)
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
                Set Range for Budget Size in Mio.
                </Typography>
                <Slider
                    value={this.state.value}
                    onChange={this.handleSliderChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    min={this.props.rangeBudget["lower_bound"]}
                    max={this.props.rangeBudget["upper_bound"]}
                />

                <Typography variant="h6" gutterBottom>
                Select Country
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

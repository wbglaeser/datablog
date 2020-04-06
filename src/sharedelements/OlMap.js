import React, { useState, Component } from "react";
import Map from 'ol/Map';
import Slider from '@material-ui/core/Slider';
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
            value: [0,100]
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
    }

    componentDidMount() {
        this.map.setTarget("map");
    }

    componentWillUnmount() {
        this.map.setTarget(null);
    }

    setValue(newValue) {
        this.setState({value: newValue})
    }

    handleChange = (event, newValue) => {
        this.setValue(newValue)
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
             </div>
        );
    }
}

export default OlMap;

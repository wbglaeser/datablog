import React, { useState, Component } from "react";
import Map from 'ol/Map';
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

// center of new map
const posBerlin = proj.fromLonLat([7.99, 16.96]);

// Setup base component for app
class OlMap extends Component {
    constructor(props) {
        super(props);
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
    }

    componentDidMount() {
        this.map.setTarget("map");
    }

    componentWillUnmount() {
        this.map.setTarget(null);
    }

    render() {
        return (
            <div id="map" className="map" style={{ width: "100%", height: "600px" }}/>
        );
    }
}

export default OlMap;

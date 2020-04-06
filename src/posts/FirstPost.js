import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from '../sharedelements/Header';
import Main from '../sharedelements/Main';
import Footer from '../sharedelements/Footer';
import { Link } from "react-router-dom";
import MainFeaturedPost from '../sharedelements/MainFeaturedPost';
import OlMap from '../sharedelements/OlMap';
import bmz from '../data/govdata/projects_25032020.json'
import * as geom from 'ol/geom';
import Feature from 'ol/Feature';
import * as proj from 'ol/proj';
import { Style, Icon, Fill, Stroke } from 'ol/style';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

var style = new Style({
    stroke: new Stroke({
        color: '#4F8AD3',
        width: 1.5
    }),
    fill: new Fill({
        color: [79, 138, 211, .4]
    })
});

// Build markers
const bmz_markers = [];
bmz.forEach(
    function(obj) {
        var _marker = new Feature({
            geometry : new geom.Circle(
                proj.fromLonLat([obj.latitude, obj.longitude]),
                obj.budget/500
            ),
        });
        _marker.setStyle(style);
        bmz_markers.push(_marker);
    }
);

console.log(bmz_markers);

const mainFeaturedPost = {
  title: 'BMZ Project Database',
  description:
    "Map displaying bmz projects.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

/// Extract unique values for selection
const extractCountries = (json) => {
    const uniqueTags = [];
    json.map(obj => {
        if (uniqueTags.indexOf(obj.recipient_country) === -1) {
            uniqueTags.push(obj.recipient_country)
        }
    });
    return uniqueTags.sort()
}

/// Build markers
const buildMarkers = (json, filter_dict) => {

    // setup marker array
    var bmz_markers = [];

    // filter json using filterdict
    for (let key in filter_dict){
        var json = json.filter(_obj=>
            _obj[key]==filter_dict[key]
        )
    }
    console.log(json);
    // create markers
    json.map((obj) => {
        var _marker = new Feature({
            geometry : new geom.Circle(
                proj.fromLonLat([obj.latitude, obj.longitude]),
                obj.budget/1000
            ),
        });
        bmz_markers.push(_marker)
    });

    return bmz_markers
}

function Post(props) {

    const classes = useStyles();
    const { setView } = props;
    const [filterDict, setFilterDict] = React.useState({});
    console.log("Filter Dict", filterDict);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                    <main>
                        <OlMap
                            points={ buildMarkers(bmz, filterDict) }
                            setFilterDict={ setFilterDict }
                            uniqueCountries={extractCountries(bmz)}
                        />
                    </main>
            </Container>
        </React.Fragment>
    );


}

export default Post;



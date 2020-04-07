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

/// Extract range for slide
const extractBudgetRange = (json) => {

    const budgetRange = {};
    var arr = json.map(obj=>{
        if (obj["budget"] != -9999 ) {
            return obj["budget"]/1000000
        }
        else {return 0}
    });
    console.log(arr);
    budgetRange["lower_bound"] = Math.min(...arr);
    budgetRange["upper_bound"] = Math.max(...arr);
    console.log(budgetRange);
    return budgetRange
}
const budgetRange = extractBudgetRange(bmz);

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
const uniqueCountries = extractCountries(bmz);

// apply filter to datasource
const filter_json = (json, filter_dict) => {

    for (let key in filter_dict) {

        if (filter_dict[key]["type"] == "range") {
            var json = json.filter(obj=>
                (obj[key]/1000000>=filter_dict[key]["lower_bound"]) &
                (obj[key]/1000000<=filter_dict[key]["upper_bound"])
            )
        }
        else if (filter_dict[key]["type"] == "value") {
            console.log("this went rhough");
            var json = json.filter(obj=>
                obj[key]==filter_dict[key]["value"])
        }
    }

    return json
}

/// Build markers
const buildMarkers = (json, filter_dict) => {

    console.log("Current filter dict:", filter_dict);

    // setup marker array
    var bmz_markers = [];

    // filter json using filterdict
    var json = filter_json(json, filter_dict)

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
    console.log("this function ran");
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
                            filter_dict={ filterDict }
                            setFilterDict={ setFilterDict }
                            uniqueCountries={ uniqueCountries }
                            rangeBudget={ budgetRange }
                        />
                    </main>
            </Container>
        </React.Fragment>
    );


}

export default Post;



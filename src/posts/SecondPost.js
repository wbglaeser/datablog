import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from '../sharedelements/Header';
import Main from '../sharedelements/Main';
import Footer from '../sharedelements/Footer';
import { Link } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

// Custom data VIZ
import ValueCard from "../sharedelements/ValueCards.js";
import LChart from "../sharedelements/LineCharts.js";

/// Load data
import dynamic_state_data from '../data/corona/merged_data.json';
import static_state_data from '../data/corona/states_static.json';

/// Styling
const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));


/// Auxilliary functions for data import
const filter_date = (data, date) => {
    var cut_off = Date.parse(date);
    var data = data.filter(obj=>
        Date.parse(obj.date) >= cut_off
    )
    return data
}
const dynamic_state_data_cut = filter_date(dynamic_state_data, "2020-03-01");

const filter_state = (data, current_state) => {
    var data = data.filter(obj=>
        obj.state == current_state
    )
    return data
}
const dynamic_state_data_filtered = filter_state(dynamic_state_data_cut, "Brandenburg");

const filter_state_static = (data, current_state) => {
    var data = data.filter(obj=>
        obj.state == current_state
    )
    return data[0]
}
const static_state_data_filtered = filter_state_static(static_state_data, "Brandenburg")
console.log(static_state_data_filtered);

/// Extract unique states for selection
const extractStates = (json) => {
    const uniqueTags = [];
    json.map(obj => {
        if (uniqueTags.indexOf(obj.state) === -1) {
            uniqueTags.push(obj.state)
        }
    });
    return uniqueTags.sort()
}
const uniqueStates = extractStates(dynamic_state_data);

const mpost_details = [
    {
        key: "confirmed",
        stackId: 1,
        color: "#8884d8"
    },
    {
        key: "recovered",
        stackId: 2,
        color: "#82ca9d"
    },
    {
        key: "deaths",
        stackId: 3,
        color: "#000000"
    }
];

const google_details = [
    {
        key: "grocery_pharm",
        stackId: 1,
        color: "#8884d8"
    },
    {
        key: "parks",
        stackId: 2,
        color: "#82ca9d"
    },
    {
        key: "residential",
        stackId: 3,
        color: "#000000"
    },
    {
        key: "retail_recr",
        stackId: 4,
        color: "#854442"
    },
    {
        key: "workplace",
        stackId: 5,
        color: "#CC4125"
    },

];

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dynamic_data: dynamic_state_data_filtered,
            static_data: static_state_data_filtered,
            current_state: "Brandenburg"
        }

        this.updateState = this.updateState.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    updateState(event) {
        this.setState({current_state: event.target.value});
        this.updateData(event.target.value);
    }

    updateData(current_state) {
        const new_dynamic_data = filter_state(dynamic_state_data_cut, current_state);
        const new_static_data = filter_state_static(static_state_data, current_state);
        this.setState({
            "dynamic_data": new_dynamic_data,
            "static_data": new_static_data
        })
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg">
                    <main>

                        <Typography variant="h5" gutterBottom>
                            Current State: {this.state.current_state}
                        </Typography>

                        <LChart data={this.state.dynamic_data} details={mpost_details}/>
                        <LChart data={this.state.dynamic_data} details={google_details}/>

                        <ValueCard data={this.state.static_data} />

                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Select Country</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={50}
                                onChange={this.updateState}
                                >
                                    {uniqueStates.map((item) =>
                                        <MenuItem value={item}>{item}</MenuItem>
                                    )}
                               </Select>
                        </FormControl>
                    </main>
                </Container>
            </React.Fragment>
        );
    }
}

export default Post;

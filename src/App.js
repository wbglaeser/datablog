import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Header from './sharedelements/Header';
import Footer from './sharedelements/Footer';
import Blog from './mainpage/Blog';
import FirstPost from './posts/FirstPost';
import SecondPost from './posts/SecondPost';
import { Post as thirdPost } from './posts/ThirdPost';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    header: {
        marginBottom: theme.spacing(2),
    }
}));

function App() {

    const classes = useStyles();
    const [view, setView] = useState("blog");

    return (
        <div className={classes.root}>
            <Header className={classes.header} title="Datahose" setView={setView} />

                {
                    view == "blog"?
                    <Blog setView={setView} />:
                    <div></div>
                }

                {
                    view == "main"?
                    <FirstPost setView={setView} />:
                    <div></div>

                }

                {
                    view == "second"?
                    <SecondPost setView={setView} />:
                    <div></div>

                }

            <Footer title="Footer" description="Something here to give the footer a purpose!" />
        </div>
    );
}

export default App;
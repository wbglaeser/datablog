import React, { useState, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Header from './sharedelements/Header';
import Footer from './sharedelements/Footer';
import Blog from './mainpage/Blog';
import FirstPost from './posts/FirstPost';
import SecondPost from './posts/SecondPost';
import { Post as thirdPost } from './posts/ThirdPost';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    header: {
        marginBottom: theme.spacing(2),
    }
});

// Setup base component for app
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view:"second"
        }

        // funcitions for ui updates
        this.setView=this.setView.bind(this);

    }

    // Allow functions to modify view state
    setView (new_view) {
        this.setState(
            {view: new_view}
        )
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Header className={classes.header} title="GovData" setView={this.setView} />

                    {
                        this.state.view == "blog"?
                        <Blog setView={this.setView} />:
                        <div></div>
                    }

                    {
                        this.state.view == "main"?
                        <FirstPost setView={this.setView} />:
                        <div></div>
                    }

                    {
                        this.state.view == "second"?
                        <SecondPost setView={this.setView} />:
                        <div></div>
                    }

                <Footer title="Footer" description="Something here to give the footer a purpose!" />
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);
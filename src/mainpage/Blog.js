import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from '../sharedelements/Header';
import MainFeaturedPost from '../sharedelements/MainFeaturedPost';
import FeaturedPost from '../sharedelements/FeaturedPost';
import Main from '../sharedelements/Main';
import Footer from '../sharedelements/Footer';
import { Link, withRouter } from "react-router-dom";

import { Post as FirstPost } from '../posts/FirstPost';
import { Post as SecondPost } from '../posts/SecondPost';
import { PostDetails as thirdPost, Post as ThirdPost } from '../posts/ThirdPost';

const useStyles = makeStyles(theme => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

const mainFeaturedPost = {
  title: 'BMZ Project Database',
  description:
    "Map displaying bmz projects.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

const secondPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [secondPost, thirdPost];

function Blog(props) {
    const classes = useStyles();
    const { setView } = props;

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                    <main>
                        <MainFeaturedPost className={classes.mainFeaturedPost} post={mainFeaturedPost} setView={setView} />
                        <Grid container spacing={4}>
                            {featuredPosts.map(post => (
                                <FeaturedPost key={post.title} post={post} setView={setView} />
                            ))}
                        </Grid>
                    </main>
            </Container>
        </React.Fragment>
    );
}

export default Blog;

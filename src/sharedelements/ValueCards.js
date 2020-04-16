import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

/// Set styling
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function ValueCard(props) {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const { data } = props;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Total Population
                </Typography>
                <Typography variant="h5" component="h2">
                    {data.pop_Insgesamt_Insgesamt}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ValueCard;
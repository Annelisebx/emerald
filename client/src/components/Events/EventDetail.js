import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, makeStyles, Button } from '@material-ui/core';

import axios from '../Util/AxiosWrapper';
import Loading from '../Loading';
import SectionContainer from '../Util/SectionContainer';
import LocationDetail from '../LocationDetail';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '50vw',
  },
  featureImage: {
    width: '15vw',
  },
});

function EventDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const config = {
      url: `http://localhost:4000/v1/events/${id}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    axios(config).then((response) => {
      setEvent(response.data);
    }).catch((err) => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <div>{`${error}`}</div>;
  } else {
    return (
      <SectionContainer direction="column">
        <Grid container item className={classes.root}>
          <Grid container item className={classes.root} direction="row">
            <Grid item>
              <img
                className={classes.featureImage}
                src={`http://localhost:4000${event.image}`}
                alt={event.title}
              />
            </Grid>
            <Grid item>
              <Typography variant="h3">
                {event.eventName}
              </Typography>
              <Typography>
                {event.gameMaster}
              </Typography>
              <Typography>
                {event.description}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Button>Buy Tickets</Button>
          </Grid>
          <Grid item>
            { !loading ? (
              <LocationDetail
                location={{ lat: event.location.latitude, lng: event.location.longitude }}
              />
            ) : <></> }
          </Grid>
        </Grid>
      </SectionContainer>
    );
  }
}

export default EventDetail;

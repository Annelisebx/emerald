import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Event from '../components/Events/Event';

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const config = {
      url: `http://localhost:4000/v1/events/${id}`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    axios(config).then((response) => {
      setEvent(response.data);
    }); // WORKITEM handle error case
  }, [id]);

  if (event) {
    return <Event event={event} />;
  }
  return <div>Loading...</div>;
}
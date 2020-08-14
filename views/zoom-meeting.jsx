/**
 * Created by Rem Yang, Aug 12 2020
 */

import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function ZoomMeeting(props) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => setIsLoading(false), []);

  if (isLoading) {
    return (
      <p>Loading ...</p>
    );
  }

  if (!props.meetingId) {
    return (
      <Form onSubmit={props.handleMeetingIdSubmit}>
        <Form.Group controlId="formMeetingId">
          <Form.Label>Enter Zoom Meeting ID:</Form.Label>
          <Form.Control type="text" placeholder="Enter meeting id" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Start
        </Button>
      </Form>
    );
  } else {
    return (
      <div style={{ width: "75%", margin: "auto" }}>
        <div className="aspect-ratio">
          <iframe title="zoom meeting window" allow="microphone; camera" src={`https://zoom.us/wc/join/${props.meetingId}`}></iframe>
        </div>
      </div>
    );
  }
}

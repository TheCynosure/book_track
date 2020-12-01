import React from 'react';
import {Container, ProgressBar} from 'react-bootstrap';

export default function ReadCount(props) {
  return (
    <Container className="w-100 mt-3 mb-3">
      <ProgressBar
        now={Math.floor((props.current / props.total) * 100)}
        label={props.current + " / " + props.total}
      />
    </Container>
  );
}

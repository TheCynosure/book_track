import React from 'react';
import {Container, ProgressBar} from 'react-bootstrap';

export default function ReadingGoalProgressBar(props) {
    let progress = props.current;
    let total = props.total;
    // So when the animation loads the bar goes left to right and not the other
    // way. Doesn't matter for label because won't show unless percentage
    // is non-zero.
    if (progress === 0 && total === 0) {
        total = 1;
    }

    return (
        <Container className="w-100 mt-3 mb-3">
            <ProgressBar
                now={Math.floor((progress / total) * 100)}
                label={progress + " / " + total}
            />
        </Container>
    );
}

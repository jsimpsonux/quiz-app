import React from 'react';
import { useState, useEffect } from "react";

//timer function

interface State {
    time:  number;
    seconds: number;
    minutes: number;
}

const Timer = () => {
    const [state, setState] = React.useState<State>({
        time: 60,
        seconds: 0,
        minutes: 1,
    });

    return (
        <h2>{`${state.minutes}: ${
            state.seconds <= 10 ? `0${state.seconds}` :  state.seconds
        }`}</h2>
    );
};

export default Timer;
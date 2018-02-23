//@flow
import React, { Component } from 'react';

import OverviewDisplayContainer from './OverviewDisplayContainer';

type Props = {};
type State = {};

export default class MusicDisplay extends Component<Props, State> {
    render() {
        return(
            <div className="music-display">
                <OverviewDisplayContainer />
            </div>    
        )
    }
}
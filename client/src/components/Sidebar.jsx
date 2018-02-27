//@flow 
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Panel } from 'react-bootstrap';

type Props = {};
type State = {};

export default class Sidebar extends Component<Props, State> {
    render() {
        return(
            <Panel className="menu">
                <ul>
                    <li>Library</li>
                    <li>
                        <Link to='/artists' >
                            Artists
                        </Link>
                    </li>
                    <li>
                        <Link to='/albums' >
                            Albums
                        </Link>
                    </li>
                    <li>
                        <Link to='/tracks' >
                            Tracks
                        </Link>
                    </li>
                </ul>
            </Panel>
        )
    }
}
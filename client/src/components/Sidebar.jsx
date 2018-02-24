//@flow 
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type Props = {};
type State = {};

export default class Sidebar extends Component<Props, State> {
    render() {
        return(
            <aside className="menu">
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
            </aside>
        )
    }
}
import React, { Component } from 'react';

type Props = {};
type State = {};

export default class Sidebar extends Component<Props, State> {
    render() {
        return(
            <aside className="menu">
                <ul>
                    <li>Library</li>
                    <li>Album</li>
                    <li>Artist</li>
                    <li>Songs</li>
                </ul>
            </aside>
        )
    }
}
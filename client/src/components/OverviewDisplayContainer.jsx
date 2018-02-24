//@flow
import React, { Component } from 'react';

import OverviewDisplay from './OverviewDisplay';

import artistData from './../db/artistData';
import albumData from './../db/albumData';
import songData from './../db/songData';
const API_KEY = process.env.API_KEY;

type Props = {};
type State = {
    artistData: Object[],
    albumData: Object[],
    songData: Object[],
    overviewData: Object[],
};

export default class OverviewDisplayContainer extends Component<Props, State> {

    state:State;

    state = {
        artistData: [],
        albumData: [],
        songData: [],
        overviewData: [],
    }

    componentDidMount() {
        this.setState({
            artistData: artistData,
            albumData: albumData,
            songData: songData,
        },() => {
            artistData.forEach((artistObj) => {
                this.apiFetch(artistObj.artist_name)
            })
        })
    }

    apiFetch(artist:string) {
        fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=e9bb8cb9315f107a6c913dd67b7ead04&format=json`)
            .then((res) => {
                return res.json();
            })
            .then((artistInfo:Object) => {
                this.setState((prevState) =>({
                    overviewData: [...prevState.overviewData, {
                        artist_id: artistInfo.artist.mbid,
                        artist_name: artistInfo.artist.name,
                        artist_image: artistInfo.artist.image[1]['#text']
                    }]
                }))
            })
    }

    render() {
        //console.log(this.state.artistData)
        return(
            <OverviewDisplay overviewData={this.state.overviewData} />  
        )
    }
}
//@flow
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect} from 'react-router-dom';

import OverviewDisplay from './OverviewDisplay';

import artistData from './../db/artistData';
import albumData from './../db/albumData';
import songData from './../db/songData';

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

    redirectToArtists() {
        return(
            <Route 
                exact 
                path='/' 
                render={ 
                    () => {
                        return(
                            <Redirect to='/artists' />
                        )
                    }     
                } 
            >
            </Route>
        )
    }

    renderAllArtists() {
        return(
            <Route
                exact 
                path='/artists'
                render={
                    () => {
                        return(
                            <OverviewDisplay 
                                overviewData={this.state.overviewData} 
                            /> 
                        )
                    }  
                }
            >
            </Route>
        )
    }

    render() {
        //console.log(this.state.artistData)
        return(
            <BrowserRouter>
                <div>
                    { this.redirectToArtists() }
                    { this.renderAllArtists() }
                </div>
            </BrowserRouter>    
             
        )
    }
}
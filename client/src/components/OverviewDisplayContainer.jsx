//@flow
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect} from 'react-router-dom';

import OverviewDisplay from './OverviewDisplay';

import artistData from './../db/artistData';
import albumData from './../db/albumData';
import trackData from './../db/trackData';

type Props = {};
type State = {
    artistData: Object[],
    albumData: Object[],
    trackData: Object[],
    overviewData: Object[],
};

export default class OverviewDisplayContainer extends Component<Props, State> {

    state:State;

    state = {
        artistData: [],
        albumData: [],
        trackData: [],
        overviewData: [],
    }

    componentDidMount() {
        artistData.forEach((artistObj) => {
            this.apiFetch('artist',artistObj.artist_name)
        })
        albumData.forEach((albumObj) => {
            this.apiFetch('album',albumObj.artist_name,albumObj.album_name,undefined)
        })
    }

    apiFetch(fetchType:string, artist:string, album?:string, track?:string) {
        switch (fetchType) {
            case 'artist':
            fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=e9bb8cb9315f107a6c913dd67b7ead04&format=json`)
                .then((res) => {
                    return res.json();
                })
                .then((artistInfo:Object) => {
                    this.setState((prevState) =>({
                        artistData: [...prevState.artistData, {
                            id: artistInfo.artist.url,
                            name: artistInfo.artist.name,
                            img: artistInfo.artist.image[1]['#text']
                        }]
                    }))
                })
            break;
            case 'album':
            fetch(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=e9bb8cb9315f107a6c913dd67b7ead04&artist=${artist}&album=${String(album)}&format=json`)
                .then((res) => {
                    return res.json();
                })
                .then((albumInfo:Object) => {
                    this.setState((prevState) =>({
                        albumData: [...prevState.albumData, {
                            id: albumInfo.album.url,
                            name: albumInfo.album.name,
                            img: albumInfo.album.image[1]['#text']
                        }]
                    }))
                })    
            default:
                break;
        }

        
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
                    ({location}) => {
                        return(
                            <OverviewDisplay 
                                overviewData={this.state.artistData} 
                                location={location.pathname.slice(1)}
                            /> 
                        )
                    }  
                }
            >
            </Route>
        )
    }

    renderAllAlbums() {
        return(
            <Route
                exact 
                path='/albums'
                render={
                    ({location}) => {
                        return(
                            <OverviewDisplay 
                                overviewData={this.state.albumData} 
                                location={location.pathname.slice(1)}
                            /> 
                        )
                    }  
                }
            >
            </Route>
        )
    }

    render() {
        console.log(this.state)
        return(
            <BrowserRouter>
                <div>
                    { this.redirectToArtists() }
                    { this.renderAllArtists() }
                    { this.renderAllAlbums() }
                </div>
            </BrowserRouter>    
             
        )
    }
}
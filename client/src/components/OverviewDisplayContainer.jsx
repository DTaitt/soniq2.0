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
        // filter out duplicate artists and albums from db      
        this.filterArtists()
        this.filterAlbums()
        
        trackData.forEach((trackObj) => {
            this.apiFetch('track', trackObj.artist_name, trackObj.album_name, trackObj.name)
        })
    }

    filterArtists() {
        let artistNames = [];
        let allArtists = [];

        for (let i = 0; i < trackData.length; i++) {
            if (artistNames.indexOf(trackData[i].artist_name) === -1) {
                artistNames.push(trackData[i].artist_name)
                allArtists.push(trackData[i])
            }
        }

        allArtists.forEach((artistObj) => {
            this.apiFetch('artist',artistObj.artist_name)
        })
    }

    filterAlbums() {
        let albumNames = [];
        let allAlbums = [];

        for (let i = 0; i < trackData.length; i++) {
            if (albumNames.indexOf(trackData[i].album_name) === -1) {
                albumNames.push(trackData[i].album_name)
                allAlbums.push(trackData[i])
            }
        }

        allAlbums.forEach((albumObj) => {
            this.apiFetch('album',albumObj.artist_name,albumObj.album_name)
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
            break;    
            case 'track':
            fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=e9bb8cb9315f107a6c913dd67b7ead04&artist=${artist}&track=${String(track)}&format=json`)
                .then((res) => {
                    return res.json();
                })
                .then((trackInfo:Object) => {
                    this.setState((prevState) =>({
                        trackData: [...prevState.trackData, {
                            id: trackInfo.track.url,
                            name: trackInfo.track.name,
                            // img: trackInfo.track.album.image[1]['#text']
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

    renderAllTracks() {
        return(
            <Route
                exact 
                path='/tracks'
                render={
                    ({location}) => {
                        return(
                            <OverviewDisplay 
                                overviewData={this.state.trackData} 
                                location={location.pathname.slice(1)}
                            /> 
                        )
                    }  
                }
            >
            </Route>
        )
    }

    renderMetadata(pathName:string, metadataType:string) {
        return(
            <Route
                exact 
                path={pathName}
                render={
                    ({location}) => {
                        return(
                            <OverviewDisplay 
                                overviewData={this.state[metadataType]} 
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
        return(
            <BrowserRouter>
                <div>
                    { this.redirectToArtists() }
                    {/* { this.renderAllArtists() }
                    { this.renderAllAlbums() }
                    { this.renderAllTracks() } */}
                    { this.renderMetadata('/artists', 'artistData') }
                    { this.renderMetadata('/albums', 'albumData') }
                    { this.renderMetadata('/tracks', 'trackData') }
                </div>
            </BrowserRouter>    
             
        )
    }
}
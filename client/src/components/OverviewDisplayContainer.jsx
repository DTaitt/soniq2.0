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
            this.fetchMetadata('track','trackData', trackObj.artist_name, trackObj.album_name, trackObj.name)
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
            this.fetchMetadata('artist','artistData',artistObj.artist_name)
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
            this.fetchMetadata('album','albumData',albumObj.artist_name,albumObj.album_name)
        })
    }

    async fetchMetadata(fetchType:string, metadataType:string, artist:string, album?:string, track?:string) {
        let metadataJson;
        switch (fetchType) {
            case 'artist':
                let artistRes = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=e9bb8cb9315f107a6c913dd67b7ead04&format=json`);
                metadataJson = await artistRes.json();
                break;
            case 'album':
                let albumRes = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=e9bb8cb9315f107a6c913dd67b7ead04&artist=${artist}&album=${String(album)}&format=json`);
                metadataJson = await albumRes.json();
                break;
            default:
                let trackRes = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=e9bb8cb9315f107a6c913dd67b7ead04&artist=${artist}&track=${String(track)}&format=json`)
                metadataJson = await trackRes.json();
                break;
        }

        try {  
            let metadataInfo = await metadataJson;

            fetchType === 'track'
            ? this.setState((prevState) =>({
                [metadataType]: [...prevState[metadataType], {
                    id: metadataInfo[fetchType].url,
                    name: metadataInfo[fetchType].name,
                }]
            }))
            : 
            this.setState((prevState) =>({
                [metadataType]: [...prevState[metadataType], {
                    id: metadataInfo[fetchType].url,
                    name: metadataInfo[fetchType].name,
                    img:metadataInfo[fetchType].image[1]['#text'] 
                }]
            }))
        } catch(err) {
            console.log(err);
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
                    { this.renderMetadata('/artists', 'artistData') }
                    { this.renderMetadata('/albums', 'albumData') }
                    { this.renderMetadata('/tracks', 'trackData') }
                </div>
            </BrowserRouter>    
             
        )
    }
}
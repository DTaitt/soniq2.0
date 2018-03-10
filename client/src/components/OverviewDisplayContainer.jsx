//@flow
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect} from 'react-router-dom';

import OverviewDisplay from './OverviewDisplay';

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
        this.filterDuplicates('artist', 'artistData');
        this.filterDuplicates('album', 'albumData');
        
        trackData.forEach((trackObj) => {
            this.fetchMetadata('track','trackData', trackObj.artist_name, trackObj.album_name, trackObj.name)
        })
    }

    //removes duplicate artists and albums
    filterDuplicates(fetchType:string, metadataType:string) {
        let databaseObjectNames = [];
        let uniqueObjects = [];

        //checks to see if an artist name has already appeared. If it hasn't add it to the unique objects array
        for (let i = 0; i < trackData.length; i++) {
            if (databaseObjectNames.indexOf(trackData[i].artist_name) === -1) {
                databaseObjectNames.push(trackData[i].artist_name)
                uniqueObjects.push(trackData[i])
            }
        }

        uniqueObjects.forEach((databaseObject) => {
            this.fetchMetadata(fetchType,metadataType,databaseObject.artist_name,databaseObject.album_name,databaseObject.name)
        })
    }

    //fetches to last FM API
    async fetchMetadata(fetchType:string, metadataType:string, artist:string, album?:string, track?:string) {
        // let res;
        // switch (fetchType) {
        //     case 'artist':
        //     try {
                
        //     } catch (error) {
                
        //     }
        //         res = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=e9bb8cb9315f107a6c913dd67b7ead04&format=json`);
        //         break;
        //     case 'album':
        //         res = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=e9bb8cb9315f107a6c913dd67b7ead04&artist=${artist}&album=${String(album)}&format=json`);
        //         break;
        //     default:
        //         res = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=e9bb8cb9315f107a6c913dd67b7ead04&artist=${artist}&track=${String(track)}&format=json`)
        //         break;
        // }

        try {  
            let res;
            switch (fetchType) {
                case 'artist':
                    res = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=e9bb8cb9315f107a6c913dd67b7ead04&format=json`);
                    break;
                case 'album':
                    res = await fetch(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=e9bb8cb9315f107a6c913dd67b7ead04&artist=${artist}&album=${String(album)}&format=json`);
                    break;
                default:
                    res = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=e9bb8cb9315f107a6c913dd67b7ead04&artist=${artist}&track=${String(track)}&format=json`)
                    break;
            }
            let metadataJson = await res.json();
            let metadataInfo = await metadataJson;

            // ternary that doesn't add an image to track data from the API
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
            <Route exact path='/' render={ 
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
            <Route exact path={pathName}
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
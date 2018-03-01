//@flow
import React from 'react';
import { Glyphicon } from 'react-bootstrap';

type Props = {
    name: string,
    img: string,
}

export default function DisplayCard(props:Props) {
    return(
        <div 
            style={{
                background: `blanchedalmond url(${props.img}) no-repeat right top`,
            }} 
            className='display-card'
        >
        <h2>{props.name}</h2>
        {
            props.location === 'tracks'
            ? <Glyphicon glyph='music' />
            : null
        }
        </div>     
    )
}
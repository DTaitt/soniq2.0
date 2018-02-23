//@flow
import React from 'react';

type Props = {
    name: string,
    img: string,
}

export default function DisplayCard(props:Props) {
    return(
        <div 
            style={{
                background: `url(${props.img}) no-repeat right top`,
            }} 
            className='display-card'>
            <h2>{props.name}</h2>
        </div>    
    )
}
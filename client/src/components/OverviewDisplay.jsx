//@flow
import React from 'react';

import DisplayCard from './DisplayCard';

type Props = {
    overviewData:Object[],
}

type artistInfo = {
    artist_id:string,
    artist_name:string,
    artist_image:string,
}

export default function OverviewDisplay(props:Props) {
    console.log(props.overviewData)
    return(
        <section className='overview-display'>
            {
                props.overviewData.map((artistInfo:artistInfo) => {
                    return(
                        <DisplayCard
                            key = { artistInfo.artist_id }
                            name = { artistInfo.artist_name }
                            img = { artistInfo.artist_image }
                        />
                    )
                })
            }
        </section>
    )
}
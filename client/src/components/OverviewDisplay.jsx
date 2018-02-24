//@flow
import React from 'react';
import { Panel, Breadcrumb } from 'react-bootstrap';

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
    return(
        <section className='overview-display'>
            <Panel>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Artists
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Panel.Body>
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
                </Panel.Body>
            </Panel>
        </section>
    )
}
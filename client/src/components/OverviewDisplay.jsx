//@flow
import React from 'react';
import { Panel, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import DisplayCard from './DisplayCard';

type Props = {
    overviewData:Object[],
    location:String,
}

type overviewInfo = {
    id:string,
    name:string,
    img:string,
}

export default function OverviewDisplay(props:Props) {
    console.log(props)
    return(
        <section className='overview-display'>
            <Panel>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to='/artists'>
                            Home
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        { props.location }
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Panel.Body>
                    <ul className='display-card-list'>
                        {
                            props.overviewData.map((overviewInfo:overviewInfo) => {
                                return(
                                    <li>
                                        <DisplayCard
                                            key = { overviewInfo.id }
                                            name = { overviewInfo.name }
                                            img = { overviewInfo.img }
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Panel.Body>
            </Panel>
        </section>
    )
}
//@flow
import React, { Component } from 'react';
import { Panel, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import DisplayCard from './DisplayCard';

type Props = {
    overviewData:Object[],
    location:String,
}

type State = {}

type overviewInfo = {
    id:string,
    name:string,
    img:string,
}

export default class OverviewDisplay extends Component<Props, State> {
    props:Props

    render() {
        return(
            <section className='overview-display'>
                <Panel>
                    <Breadcrumb>
                        <li>
                            <Link to='/artists'>
                                Home
                            </Link>
                        </li>
                        <Breadcrumb.Item active>
                            { this.props.location }
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Panel.Body>
                        <ul className='display-card-list'>
                            { 
                                this.props.overviewData.map((overviewInfo:overviewInfo) => {
                                    return(
                                        <li key = { overviewInfo.id }>
                                            <Link 
                                                to={
                                                    this.props.location === 'artists'
                                                    ? '/albums'
                                                    : `/albums/${overviewInfo.name.toLowerCase()}`
                                                    }
                                            >
                                                <DisplayCard
                                                    name = { overviewInfo.name }
                                                    img = { overviewInfo.img }
                                                />
                                            </Link>
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
}
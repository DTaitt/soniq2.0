// @flow
import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

type Props = {
    // handleSearch(searchQuery: string): string,
}

type State = {
    value: string,
};

export default class Search extends Component<Props, State> {

    // props: Props

    // state: State = {
    //     value: '',
    // }

    // handleChange = this.handleChange.bind(this);

    // handleChange(e: any) {
    //     this.setState({
    //         value: e.target.value,
    //     }, () => {
    //         this.props.handleSearch(this.state.value.toLowerCase())
    //     })

    // }

    render() {
        return (
            <form className="search" >
                <FormGroup>
                    <ControlLabel>Search</ControlLabel>
                    <FormControl
                        type='text'
                        // value={this.state.value}
                        placeholder='Search'
                        // onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>
            </form>
        )
    }
}
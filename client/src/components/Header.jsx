//@flow
import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

export default function Header() {
    return(
        <header>
            <Link to='/artists'>
                <h1>Soniq</h1>
            </Link>    
            <Search />
        </header>    
    )
}
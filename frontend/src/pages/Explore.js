import React from 'react';
import Nav from '../components/Nav';
import ItemDisplay from '../components/ItemDisplay';
import Search from '../components/Search';


class Explore extends React.Component {
    render() {
        return (
        <div id="main">
            <Nav/>
            <Search/>
            <ItemDisplay/>
        </div>
        )
    }
}

export default Explore
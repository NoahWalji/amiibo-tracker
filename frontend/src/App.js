import React from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ComingSoon from './components/ComingSoon'


class App extends React.Component {
    render() {
        return (
        <div id="main">
            <Nav/>
            <Hero/>
            <ComingSoon/>
        </div>
        )
    }
}

export default App
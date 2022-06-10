import React from 'react';
import Item from './Item'

class ComingSoon extends React.Component {
    constructor() {
        super();
        this.state = {
            unreleased: [],
            loading: true
        }
    }

    componentDidMount() {
        fetch(`https://amiibo-tracker.herokuapp.com/api/amiibo?unreleased=true`, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
      
          })
        .then(res => res.json())
        .then(unreleased => this.setState({unreleased}))
        .then(loading => this.setState({loading: false}))
    }


    render() {

        if (this.state.loading) {
            return null;
        }

        return (
            <div className="container">
                <div className="comingSoonTitle">
                    <h1>Coming Soon</h1>
                    <span>(Some Images Are Not Final)</span>
                </div>
               <div className="row">
                  {this.state.unreleased.map((unreleased, index) => {
                    return (
                        <Item key={unreleased.id} id={unreleased.id} name={unreleased.name} image={unreleased.image} series={unreleased.series} franchise={unreleased.franchise} date={unreleased.date}/>
                     )
                 })}
               </div>
            </div>
          )
    }
}


export default ComingSoon;
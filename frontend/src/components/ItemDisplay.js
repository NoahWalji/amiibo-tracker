import React from 'react';
import Item from './Item'

class ItemDisplay extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            loading: true
        }
    }

    componentDidMount() {
        let query = window.location.search;
        let params = new URLSearchParams(query);
        let search = params.get('search');

        if (!search) {
            fetch(`https://amiibo-tracker.herokuapp.com/api/amiibo`, {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
          
              })
            .then(res => res.json())
            .then(items => this.setState({items}))
            .then(loading => this.setState({loading: false}))
        }

        else {
            fetch(`https://amiibo-tracker.herokuapp.com/api/amiibo?search=`+search, {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
          
              })
            .then(res => res.json())
            .then(items => this.setState({items}))
            .then(loading => this.setState({loading: false}))
        }
    }


    render() {

        if (this.state.loading) {
            return null;
        }

        return (
            <div className="container">
               <div className="row">
                  {this.state.items.map((item, index) => {
                    return (
                        <Item key={item.id} id={item.id} name={item.name} image={item.image} series={item.series} franchise={item.franchise} date={item.date}/>
                     )
                 })}
               </div>
            </div>
          )
    }
}


export default ItemDisplay;
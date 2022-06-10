import React from 'react';


class Search extends React.Component {
    
    render() {
        let query = window.location.search;
        let params = new URLSearchParams(query);
        let search = params.get('search');
        return (
        <div className="container">
            <div className="comingSoonTitle">
                <h1>Explore All Amiibo</h1>
                <span>Search Or View By Name, Series or Franchise</span>
            </div>
            <form>
                <div className="input-group">
                    <input name='search' defaultValue={search} type="text" className="form-control" placeholder="Search..."/>
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="submit"><i className="fa fa-search"></i></button>
                    </div>
                </div>
            </form>
        </div>
        )
    }
}

export default Search
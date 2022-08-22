import React from 'react';

const Search = (props) => {

    const {searchTxt, set_searchTxt}=props;

    return (
        <div className="search-input">
            <input value={searchTxt} onChange={(e)=>set_searchTxt(e.target.value)} type="text" placeholder="search in contacts..." />
            <div className="search-icon">
                <i className="fa fa-search" aria-hidden="true"></i>
            </div>
        </div>
    );
};

export default Search;
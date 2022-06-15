import React from 'react'


const SearchBar = ({ searchTerm, onChangeHandler }) => {
  return (
    <div>
      find countries:&nbsp;
      <input value={searchTerm} onChange={onChangeHandler} />
    </div>
  )
}

export default SearchBar;
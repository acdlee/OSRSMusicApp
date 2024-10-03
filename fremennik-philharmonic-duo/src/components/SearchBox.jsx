const SearchBox = ({ search, handleSearch }) => {
    return (
      <div>
        <label htmlFor="search">Search:</label>
        <input id='search' value={search} onChange={handleSearch}/>
      </div>
    )
}

export default SearchBox
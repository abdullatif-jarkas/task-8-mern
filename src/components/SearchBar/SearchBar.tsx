import "./SearchBar.css";

const SearchBar = ({ query, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Search product by name "
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

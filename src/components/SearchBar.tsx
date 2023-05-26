interface SearchBarProps {
  value: string;
  placeholder: string;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  placeholder,
  onKeyDown,
  handleSearchChange,
}) => {
  return (
    <div className="search-bar my-4">
      <input
        className="border border-gray-400 bg-gray-100 rounded px-2 py-1 min-w-full"
        type="text"
        value={value}
        onChange={handleSearchChange}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
export default SearchBar;

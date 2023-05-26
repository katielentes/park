interface SearchBarProps {
  value: string;
  placeholder: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  placeholder,
  onKeyPress,
  handleSearchChange,
}) => {
  return (
    <div className="search-bar my-4">
      <input
        className="border border-gray-400 bg-gray-100 rounded px-2 py-1 min-w-full"
        type="text"
        value={value}
        onKeyDown={onKeyPress}
        onChange={handleSearchChange}
        placeholder={placeholder}
      />
    </div>
  );
};
export default SearchBar;

interface TabProps {
  selected: boolean;
  label: string;
  selectId: number;
  onSelect: (selectId: number) => void;
}

const Tab: React.FC<TabProps> = ({ selected, onSelect, selectId, label }) => {
  const handleSelect = () => {
    onSelect(selectId);
  };

  return (
    <button
      onClick={handleSelect}
      className={`mb-4 mr-4 ${
        selected && 'border-b pb-2 border-blue-700 text-blue-700 font-bold'
      }`}
    >
      {label}
    </button>
  );
};
export default Tab;

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
        selected && 'border-b pb-2 border-teal-600 text-teal-600 font-bold'
      }`}
    >
      {label}
    </button>
  );
};
export default Tab;

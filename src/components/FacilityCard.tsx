'use client';

interface Customer {
  customerId: number;
  customerName: string;
  phone: string;
  car: {
    carId: number;
    carName: string;
    assignedSpot: string;
  };
}

interface Facility {
  facilityId: number;
  facilityName: string;
  customers: Customer[];
}

interface FacilityCardProps {
  facility: Facility;
  onSelect: (facilityId: number) => void;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ facility, onSelect }) => {
  const handleSelect = () => {
    onSelect(facility.facilityId);
    // onSelect.bind(null, facility.facilityId);
  };
  return (
    <button
      onClick={handleSelect}
      className="rounded-lg bg-gray-800 p-4 text-white mb-4 mr-4"
    >
      {facility.facilityName}
    </button>
  );
};
export default FacilityCard;

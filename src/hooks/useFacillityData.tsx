import { useEffect, useState } from 'react';
import data from '../data.json';

// Define the type for the facility data
type Facility = {
  facilityId: number;
  facilityName: string;
  tickets: Ticket[];
};

type Ticket = {
  ticketId: number;
  serviceType: string;
  checkInTime: string;
  checkOutTime: string | null;
  totalCost: number;
  paid: boolean;
  assignedSpot: string;
  logs: { exit: string }[] | { enter: string }[];
  customer: Customer;
  car: Car;
};

type Customer = {
  customerId: number;
  customerName: string;
  phone: string;
};

type Car = {
  carId: number;
  plate: string;
  carColor: string;
  carMake: string;
  carModel: string;
};

// Define the custom hook
const useFacilityData = (selectedFacilityId: number): Facility | null => {
  const [facilityData, setFacilityData] = useState<Facility | null>(null);

  useEffect(() => {
    // Simulate an API call to fetch the facility data
    const fetchData = async () => {
      try {
        // Fetch the data from your API endpoint or import it from a JSON file
        // const response = await fetch('/api/facilityData'); // Adjust the endpoint as needed
        // const data = await response.json();

        // Find the facility with the selectedFacilityId
        const selectedFacility = data.parkingFacilities.find(
          (facility: Facility) => facility.facilityId === selectedFacilityId
        );

        // Update the facilityData state
        setFacilityData(selectedFacility || null);
      } catch (error) {
        console.error('Error fetching facility data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [selectedFacilityId]);

  return facilityData;
};

export default useFacilityData;

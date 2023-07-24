import { useEffect, useState } from 'react';
import facilities from '../facilities.json';
import tickets from '../tickets.json';

// Define the type for the facility data
type Facility = {
  facilityId: number;
  facilityName: string;
};

type Ticket = {
  ticketId: number;
  facilityId: number;
  serviceType: string;
  checkInTime: string;
  checkOutTime: string | null;
  totalCost: number;
  paid: boolean;
  assignedSpot: string;
  logs: LogEntry[];
  car: {
    carId: number;
    plate: string;
    carColor: string;
    carMake: string;
    carModel: string;
  };
  customer: {
    customerId: number;
    customerName: string;
    phone: string;
  };
};

type LogEntry = {
  type: 'enter' | 'exit';
  time: string;
};

type Car = {
  carId: number;
  plate: string;
  carColor: string;
  carMake: string;
  carModel: string;
};

type Customer = {
  customerId: number;
  customerName: string;
  phone: string;
};

// Define the custom hook
const useFacilityTickets = (selectedFacilityId: number): Ticket[] | null => {
  const [facilityTickets, setFacilityTickets] = useState<Ticket[] | null>(null);

  useEffect(() => {
    // Simulate an API call to fetch the facility data
    const fetchData = async () => {
      try {
        // Fetch the data from your API endpoint or import it from a JSON file
        // const response = await fetch('/api/facilityTickets'); // Adjust the endpoint as needed
        // const data = await response.json();

        // Find the facility with the selectedFacilityId
        const selectedFacility = facilities.find(
          (facility: { facilityId: number }) =>
            facility.facilityId === selectedFacilityId
        ) as Facility | undefined;
        const filteredTickets = tickets.filter(
          (ticket) =>
            ticket.facilityId === selectedFacilityId &&
            ticket.checkOutTime === null
        );
        // Update the facilityTickets state
        setFacilityTickets(filteredTickets || []);
        //TODO: idk this is not working rn
      } catch (error) {
        console.error('Error fetching facility data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [selectedFacilityId]);

  return facilityTickets;
};

export default useFacilityTickets;

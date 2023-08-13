'use client';
import React, { useEffect, useState } from 'react';
import useFacilityTickets from '@/hooks/useFacilityTickets';
import { useFacilityContext } from '@/context/FacilityContext';
import Tab from '@/components/Tab';
import TicketCard from '@/components/Ticket';
import SearchBar from '@/components/SearchBar';
import ErrorText from '@/components/ErrorText';

async function getFacilities() {
  try {
    const res = await fetch('/api/facilities');

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching facilities:', error);
    throw new Error('Failed to fetch facilities');
  }
}

const DashboardPage = () => {
  const [loading, setLoading] = useState(true); // Add loading state

  const [searchValue, setSearchValue] = useState('');
  //TODO: Save selectedFacilityId in local storage
  const { facilities, setFacilities, selectedFacility, setSelectedFacility } =
    useFacilityContext();

  //TODD: memoize facilityTickets
  const facilityTickets = useFacilityTickets(
    selectedFacility?.facilityId || facilities[0]?.facilityId
  );
  const [filteredData, setFilteredData] = useState(facilityTickets);
  const [error, setError] = useState('');

  useEffect(() => {
    getFacilities()
      .then((data) => {
        setFacilities(data.facilities);

        if (data.facilities.length > 0) {
          setSelectedFacility(data.facilities[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching facilities:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false once fetch is complete
      });
  }, []);

  //TODO: create debounce function -- have a hook but dont know how to use it

  useEffect(() => {
    if (facilityTickets && facilityTickets.length === 0) {
      setError('No open tickets');
    } else {
      setError('');
    }
    setFilteredData(facilityTickets);
  }, [facilityTickets]);

  const onSelect = (facilityId: number) => {
    const selectedFacility =
      facilities.find((facility) => facility.facilityId === facilityId) ||
      facilities[0];
    setSelectedFacility(selectedFacility);
    setSearchValue('');
  };

  const onKeyPress = (event: any) => {
    if (event.key === 'Escape') {
      setSearchValue('');
      setError('');
      setFilteredData(facilityTickets);
    }
    //TODO: maybe only call filterBySearch if event.key === 'Enter'
  };

  // const findOpenTicketsByFacility = (selectedFacility: number) => {
  //   return tickets.filter(
  //     (ticket) =>
  //       ticket.facilityId === selectedFacility && ticket.checkOutTime === null
  //   );
  // };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    filterBySearch(event);
    setSearchValue(value);
  };

  const filterBySearch = (event: any) => {
    const { value } = event.target;
    if (facilityTickets && facilityTickets.length > 0) {
      if (value === '') {
        setFilteredData(facilityTickets);
      } else {
        const nameMatch = facilityTickets.filter((ticket: any) => {
          return ticket.customer.customerName
            .toLowerCase()
            .includes(value.toLowerCase());
        });
        setFilteredData(nameMatch);
        nameMatch.length === 0 ? setError('No matches') : setError('');
      }
    } else {
      setError('No open tickets');
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Open tickets</h1>
      <SearchBar
        placeholder="Search by name"
        handleSearchChange={handleSearchChange}
        onKeyPress={onKeyPress}
        value={searchValue}
      />
      {!loading ? (
        <>
          {facilities.map((facility) => (
            <Tab
              key={facility.facilityId}
              selectId={facility.facilityId}
              onSelect={onSelect}
              selected={selectedFacility?.facilityId === facility.facilityId}
              label={facility.facilityName}
            />
          ))}
          {!selectedFacility && <div>Please select location</div>}
          {filteredData &&
            filteredData.map((ticket: Ticket) => (
              <TicketCard key={ticket.ticketId} ticket={ticket} />
            ))}
          {error && <ErrorText text={error} />}
        </>
      ) : null}
      {loading ? <div>Loading...</div> : null}
    </>
  );
};
export default DashboardPage;

'use client';
import React, { useContext, useEffect, useState, useMemo } from 'react';
// import data from '../../data.json';
import facilities from '../../facilities.json';
import useFacilityTickets from '@/hooks/useFacilityTickets';
import { FacilityContext } from '@/context/FacilityContext';
import Tab from '@/components/Tab';
import TicketCard from '@/components/Ticket';
import SearchBar from '@/components/SearchBar';
import ErrorText from '@/components/ErrorText';
import { Ticket } from '@/types/facility';

const DashboardPage = () => {
  const [searchValue, setSearchValue] = useState('');
  //TODO: Save selectedFacilityId in local storage
  const { selectedFacility, setSelectedFacility } = useContext(FacilityContext);
  console.log('selectedFacility', selectedFacility);
  //TODO: Add loading state
  //TODD: memoize facilityTickets
  const facilityTickets = useFacilityTickets(selectedFacility);
  const [filteredData, setFilteredData] = React.useState(facilityTickets);
  const [error, setError] = React.useState('');

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
    setSelectedFacility(facilityId);
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
    event.preventDefault();
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
      {facilities &&
        facilities.map((facility) => {
          return (
            <Tab
              key={facility.facilityId}
              selectId={facility.facilityId}
              onSelect={onSelect}
              selected={selectedFacility === facility.facilityId}
              label={facility.facilityName}
            />
          );
        })}
      {/*TODO: Should below text be an ErrorText */}
      {!selectedFacility && <div>Please select location</div>}
      {filteredData &&
        filteredData.map((ticket: Ticket) => {
          return <TicketCard key={ticket.ticketId} ticket={ticket} />;
        })}
      {error && <ErrorText text={error} />}
    </>
  );
};
export default DashboardPage;

'use client';
import React, { useContext, useEffect, useState } from 'react';
import data from '../../data.json';
import useFacilityTickets from '@/hooks/useFacilityTickets';
import { FacilityContext } from '@/context/FacilityContext';
import Tab from '@/components/Tab';
import Ticket from '@/components/Ticket';
import SearchBar from '@/components/SearchBar';
import ErrorText from '@/components/ErrorText';

const DashboardPage = () => {
  const { parkingFacilities } = data;
  const [searchValue, setSearchValue] = useState('');
  //TODO: Save selectedFacilityId in local storage
  const { selectedFacility, setSelectedFacility } = useContext(FacilityContext);
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
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    filterBySearch(event);
    setSearchValue(value);
  };

  const filterBySearch = (event: any) => {
    const { value } = event.target;
    const { key } = event;
    //TODO: Fix any type
    if (facilityTickets && facilityTickets.length > 0) {
      if (key === 'Escape') {
        setSearchValue('');
        setError('');
        setFilteredData(facilityTickets);
      } else if (value === '') {
        setFilteredData(facilityTickets);
      } else {
        const nameMatch = facilityTickets.filter((ticket) => {
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
        value={searchValue}
        onKeyDown={filterBySearch}
      />
      {parkingFacilities &&
        parkingFacilities.map((facility) => {
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
        filteredData.map((ticket) => {
          return <Ticket key={ticket.ticketId} ticket={ticket} />;
        })}
      {error && <ErrorText text={error} />}
    </>
  );
};
export default DashboardPage;

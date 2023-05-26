'use client';
import React, { useContext, useEffect } from 'react';
import data from '../../data.json';
import useFacilityTickets from '@/hooks/useFacilityTickets';
import { FacilityContext } from '@/context/FacilityContext';
import Tab from '@/components/Tab';
import Ticket from '@/components/Ticket';
import SearchBar from '@/components/SearchBar';
import ErrorText from '@/components/ErrorText';

const DashboardPage = () => {
  const { parkingFacilities } = data;
  const [searchValue, setSearchValue] = React.useState('');
  //TODO: Save seletedFacilityId in local storage
  const { selectedFacility, setSelectedFacility } = useContext(FacilityContext);
  const facilityTickets = useFacilityTickets(selectedFacility);
  const [filteredData, setFilteredData] = React.useState(facilityTickets);
  const [error, setError] = React.useState('');

  useEffect(() => {
    if (facilityTickets && facilityTickets.length === 0) {
      setError('No open tickets');
    }
    setSearchValue('');
    setFilteredData(facilityTickets);
  }, [facilityTickets]);

  const onSelect = (facilityId: number) => {
    setSelectedFacility(facilityId);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filterBySearch = (event: any) => {
    //TODO: Fix any type
    //TODO: create debounce function
    if (facilityTickets && facilityTickets.length > 0) {
      if (event.key === 'Escape') {
        setSearchValue('');
        setFilteredData(facilityTickets);
      } else if (searchValue === '') {
        setFilteredData(facilityTickets);
      } else {
        const nameMatch = facilityTickets.filter((ticket) => {
          return ticket.customer.customerName
            .toLowerCase()
            .includes(searchValue.toLowerCase());
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

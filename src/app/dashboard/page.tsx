'use client';
import React, { useContext } from 'react';
import data from '../../data.json';
import useFacilityData from '@/hooks/useFacillityData';
import { FacilityContext } from '@/context/FacilityContext';
import Tab from '@/components/Tab';
import Ticket from '@/components/Ticket';

const DashboardPage = () => {
  const { selectedFacility, setSelectedFacility } = useContext(FacilityContext);
  const facilityData = useFacilityData(selectedFacility);
  const { parkingFacilities } = data;

  const onSelect = (facilityId: number) => {
    setSelectedFacility(facilityId);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Open tickets</h1>
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
      {!facilityData && <div>Please select location</div>}
      {facilityData &&
        facilityData.tickets &&
        facilityData.tickets.map((ticket) => {
          return <Ticket key={ticket.ticketId} ticket={ticket} />;
        })}
    </>
  );
};
export default DashboardPage;

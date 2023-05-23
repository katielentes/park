'use client';
import React, { useContext } from 'react';
import data from '../../data.json';
import { FacilityContext } from '@/context/FacilityContext';
import FacilityCard from '@/components/FacilityCard';

const DashboardPage = () => {
  const { selectedFacility, setSelectedFacility } = useContext(FacilityContext);

  const { parkingFacilities } = data;
  const onSelect = (facilityId: number) => {
    setSelectedFacility(facilityId);
  };

  console.log(selectedFacility, 'selectedFacility');
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Select location</h1>
      {parkingFacilities &&
        parkingFacilities.map((facility) => {
          return (
            <FacilityCard
              key={facility.facilityId}
              facility={facility}
              onSelect={onSelect}
            />
          );
        })}
    </>
  );
};
export default DashboardPage;

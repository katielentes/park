'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type FacilityContextType = {
  facilities: Facility[];
  setFacilities: (facilities: Facility[]) => void;
  selectedFacility: Facility | null;
  setSelectedFacility: (facility: Facility) => void;
};

const FacilityContext = createContext<FacilityContextType | undefined>(
  undefined
);

export const FacilityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null
  );

  return (
    <FacilityContext.Provider
      value={{
        facilities,
        setFacilities,
        selectedFacility,
        setSelectedFacility,
      }}
    >
      {children}
    </FacilityContext.Provider>
  );
};

export const useFacilityContext = () => {
  const context = useContext(FacilityContext);
  if (context === undefined) {
    throw new Error(
      'useFacilityContext must be used within a FacilityProvider'
    );
  }
  return context;
};

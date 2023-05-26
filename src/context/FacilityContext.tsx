'use client';
import React, { createContext, useState } from 'react';

interface FacilityContextType {
  selectedFacility: number | 1;
  setSelectedFacility: (facility: number | 1) => void;
}

interface FacilityInfoProps {
  children: React.ReactNode;
}

const initialSelectedFacility: number | 1 = 1;

export const FacilityContext = createContext<FacilityContextType>({
  selectedFacility: initialSelectedFacility,
  setSelectedFacility: () => {},
});

export const FacilityProvider: React.FC<FacilityInfoProps> = ({ children }) => {
  const [selectedFacility, setSelectedFacility] = useState<number | 1>(
    initialSelectedFacility
  );

  return (
    <FacilityContext.Provider value={{ selectedFacility, setSelectedFacility }}>
      {children}
    </FacilityContext.Provider>
  );
};

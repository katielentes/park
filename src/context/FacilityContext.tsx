'use client';
import React, { createContext, useState } from 'react';

interface FacilityContextType {
  selectedFacility: number | null;
  setSelectedFacility: (facility: number | null) => void;
}

interface FacilityInfoProps {
  children: React.ReactNode;
}

const initialSelectedFacility: number | null = null;

export const FacilityContext = createContext<FacilityContextType | undefined>(
  undefined
);

export const FacilityProvider: React.FC<FacilityInfoProps> = ({ children }) => {
  const [selectedFacility, setSelectedFacility] = useState<number | null>(
    initialSelectedFacility
  );

  return (
    <FacilityContext.Provider value={{ selectedFacility, setSelectedFacility }}>
      {children}
    </FacilityContext.Provider>
  );
};

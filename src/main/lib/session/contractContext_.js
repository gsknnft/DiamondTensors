'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import useContract from './useContract';

const ContractContext = createContext({
  contract: null,
});

export const ContractProvider = ({ children }) => {
  const contract = useContract();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (contract) {
      setInitialized(true);
      console.log("ContractProvider initialized");
    }
  }, [contract]);

  return (
    <ContractContext.Provider value={{ contract }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => useContext(ContractContext);
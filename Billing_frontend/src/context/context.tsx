// src/contexts/MyContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

// Create the context without a default value
const MyContext = createContext<any | undefined>(undefined);

// Create a provider component
export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const defaultUrl = 'http://billing-env-1.eba-uxy2bnxa.ap-south-1.elasticbeanstalk.com';

  const contextValue: any = {
    defaultUrl
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook for easier use of the context
export const Context = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

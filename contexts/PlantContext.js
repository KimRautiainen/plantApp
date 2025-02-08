import React, { createContext, useState, useContext } from "react";

// Create the Context
const PlantContext = createContext();

// Provider
export const PlantProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);

  // Function to add new plant
  const addPlant = (plant) => {
    setPlants([...plants, { id: Date.now().toString(), ...plant }]);
  };

  // Function to update a plant's details
  const updatePlant = (plantId, updatedData) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === plantId ? { ...plant, ...updatedData } : plant
      )
    );
  };

  return (
    <PlantContext.Provider value={{ plants, addPlant, updatePlant }}>
      {children}
    </PlantContext.Provider>
  );
};

// Custom Hook for easier use of context
export const usePlantContext = () => {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error("usePlantContext must be used within a PlantProvider");
  }
  return context;
};

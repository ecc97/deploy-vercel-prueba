import { apiUrl } from "./apiUrl";
import { PropertyData } from "../types/PropertyData";

export const createProperty = async (propertyData: PropertyData) => {
    try {
      const response = await fetch(`${apiUrl}/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create property");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating property:", error);
      throw error;
    }
  };

export const getProperties = async () => {
    try {
      const response = await fetch(`${apiUrl}/properties`);
      if (!response.ok) {
        throw new Error('Error fetching properties');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
};

export const getPropertyById = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/properties/${id}`);
      if (!response.ok) {
        throw new Error('Error fetching property');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching property by ID:', error);
      return null;
    }
};

export const updateProperty = async (id: string, updatedData: PropertyData) => {
  try {
    const response = await fetch(`${apiUrl}/properties/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to update property');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};

export const deleteProperty = async (id: string) => {
  try {
    const response = await fetch(`${apiUrl}/properties/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error eliminando la propiedad");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
  
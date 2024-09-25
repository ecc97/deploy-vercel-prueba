"use client";

import React, { useState, useEffect } from "react";
import { getProperties } from "../../../api/properties"; // Función para obtener las propiedades
import { PropertyData } from "../../../types/PropertyData"; // El tipo para la información de propiedad
import Card from "../../../components/Cards";
import Nav from "../../../components/Nav";
import FooterPage from "../../../components/Footer";

const FilterProperties: React.FC = () => {
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyData[]>(
    []
  );
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    rooms: "",
    typeSale: "",
  });

  // Cargar las propiedades desde la API cuando se monta el componente
  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getProperties();
      setProperties(data);
      setFilteredProperties(data); // Inicialmente todas las propiedades
    };
    fetchProperties();
  }, []);

  // Función para manejar los cambios en los filtros
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Función para filtrar propiedades basado en los valores de los filtros
  const applyFilters = () => {
    const filtered = properties.filter((property) => {
      const matchesLocation = filters.location
        ? property.location
            .toLowerCase()
            .includes(filters.location.toLowerCase())
        : true;
      const matchesMinPrice = filters.minPrice
        ? parseInt(property.price) >= parseInt(filters.minPrice)
        : true;
      const matchesMaxPrice = filters.maxPrice
        ? parseInt(property.price) <= parseInt(filters.maxPrice)
        : true;
      const matchesRooms = filters.rooms
        ? parseInt(property.rooms) === parseInt(filters.rooms)
        : true;
      const matchesTypeSale = filters.typeSale
        ? property.type_sale === filters.typeSale
        : true;

      return (
        matchesLocation &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesRooms &&
        matchesTypeSale
      );
    });
    setFilteredProperties(filtered);
  };

  return (
    <div className="flex flex-col h-auto w-screen">
      <div className="bg-[#003C71] text-white no-underline">
        {/*---------------MENU NAV---------------- */}
        <Nav />
      </div>
      <h1 className="text-center text-3xl font-bold mt-10">
        Buscar Propiedades
      </h1>
      <div className="filter-section p-10">
        <div className="filter-form grid grid-cols-2 gap-4">
          <input
            type="text"
            name="location"
            placeholder="Ubicación"
            value={filters.location}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Precio Mínimo"
            value={filters.minPrice}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Precio Máximo"
            value={filters.maxPrice}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="rooms"
            placeholder="Número de Habitaciones"
            value={filters.rooms}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <select
            name="typeSale"
            value={filters.typeSale}
            onChange={handleInputChange}
            className="border p-2 rounded"
          >
            <option value="">Tipo de Venta</option>
            <option value="venta">Venta</option>
            <option value="arrienda">Arrienda</option>
          </select>
        </div>
        <button
          onClick={applyFilters}
          className="mt-5 bg-blue-500 text-white p-2 rounded"
        >
          Aplicar Filtros
        </button>
      </div>

      {/* Mostrar propiedades filtradas */}
      <section className="section-cards-customer h-screen flex justify-around items-center p-24  w-full flex flex-wrap gap-1">
        {filteredProperties.map((property) => (
          <Card key={property.id} property={property} onDelete={() => {}}/>
        ))}
      </section>

      {/*-------------- FOOTER---------------- */}
      <FooterPage />
    </div>
  );
};

export default FilterProperties;

"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Nav from "../../../../components/Nav";
import FooterPage from "../../../../components/Footer";
import Link from "next/link";
import { PropertyData } from "../../../../types/PropertyData";
import { getPropertyById } from "../../../../api/properties";
import { useParams } from "next/navigation";

const DetailsProperty: React.FC = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<PropertyData | null>(null);

  useEffect(() => {
    // Cargar los datos de la propiedad por ID
    const loadProperty = async () => {
      if (id) {
        const propertyData = await getPropertyById(String(id));
        setProperty(propertyData);
      }
    };
    
    loadProperty();
  }, [id]);

  useEffect(() => {
    // Importar el JavaScript de Bootstrap después del renderizado del cliente
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-[#003C71]">
        {/*---------------MENU NAV---------------- */}
        <Nav></Nav>
      </div>
      <div className="pt-10 pb-10 mt-10 mb-10 w-full border-2 border-b-[#003C71] border-t-[#003C71]">
        <h3 className="text-5xl text-[#003C71] text-center">Caracteristicas</h3>
      </div>
      {/*--------------BUTTON RETURN---------------- */}
      <div className="p-10 flex justify-center items-center">
        <Link href="/pages/customer">
          <button className="button-know-home text-[#003C71] rounded-sm shadow-[#003C71]-500/40 border-t-2 border-b-2 border-[#003C71] p-3">Regresar</button>
        </Link>
      </div>
      {/* ------------section carousel images-------- */}
      <div className="carousel-bootstrap w-full h-full">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {property.images?.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {property.images?.map((image, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <img
                  src={image}
                  className="d-block w-100"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <section className="p-20 w-full h-full flex flex-col lg:w-full flex justify-center items-center">
        {/* ------------information-------- */}
        <div className="information-propiety w-full h-full flex flex-col lg:w-8/12 flex justify-center items-center">
          <div className="form-information-propiety w-full h-full">
            <div className="w-full h-full">
              
              <h4>Ubicación: {property.location}</h4>
              <h4>Precio: {property.price}</h4>
              <h4>Habitaciones: {property.rooms}</h4>
              <h4>Baños: {property.bathrooms}</h4>
              <h4>Área: {property.area} m²</h4>
              <h4>Tipo de venta: {property.type_sale}</h4>
                
              {/* ------------images icons-------- */}
              <div className="flex flex-row justify-around p-3 text-[#003c71] text-sm lg:w-8/12 flex justify-center items-center ">
                <div className="w-1/6 h-1/6 ">
                  <img
                    src="/assets/icons/mas.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-1/6 h-1/6 ">
                  <img
                    src="/assets/icons/mas.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-1/6 h-1/6 ">
                  <img
                    src="/assets/icons/mas.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-1/6 h-1/6 ">
                  <img
                    src="/assets/icons/mas.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="button-informatio-propiety pt-10 w-full h-full flex justify-center items-center ">

          </div>
          <div className="button-informatio-propiety pt-10 w-full h-full flex justify-center items-center ">
           <button className="button-know-home text-[#003C71] rounded-sm shadow-[#003C71]-500/40 border-t-2 border-b-2 border-[#003C71] p-3">
            Comprar
           </button>
          </div>
        </div>
      </section>
      <FooterPage></FooterPage>
    </>
  );
};

export default DetailsProperty;
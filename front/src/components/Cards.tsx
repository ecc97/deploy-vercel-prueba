import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { PropertyData } from "../types/PropertyData";
import { deleteProperty } from "../api/properties";
import Swal from "sweetalert2";
import { alertSuccess } from "./alerts/Alerts.component";

// Breakpoints para responsive
const breakpoints = {
  mobile: "768px",
};

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 20%;
  height: max-content;
  border-radius: 0.375rem; /* rounded-md */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5); /* shadow-lg shadow-gray-500/50 */
  padding: 0px;
  margin: 0px;
  
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    height: auto;
  }
`;

const ImageContainer = styled.div`
  height: 15rem; /* h-60 */
  width: 100%;
  object-fit: contain; /* object-contain */
  border-radius: 0.375rem; /* rounded-md */

  @media (max-width: ${breakpoints.mobile}) {
    height: 12rem; /* Ajustamos la altura en móviles */
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 0.375rem; /* rounded-md */
`;

const InfoContainer = styled.div`
  height: 50%; /* h-2/4 */
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(0, 60, 112, 1) 29%,
    rgba(123, 174, 219, 1) 80%
  );
  /* bg-[#003C71] */
  color: white;

  @media (max-width: ${breakpoints.mobile}) {
    height: auto; /* Dejar que crezca según el contenido */
  }
`;

const Title = styled.h4`
  background-color: white;
  color: #003c71; /* text-[#003C71] */
  font-weight: bold;
  padding: 0.5rem; /* pl-5 */
  text-align: center;
  font-size: 1.25rem; /* Ajustamos el tamaño de la fuente */
  @media (max-width: ${breakpoints.mobile}) {
    text-align: center;
  }
`;

const TypeSale = styled.h4`
  background-color: #003c71; /* bg-[#ffffff58] */
  padding: 0.25rem 0.5rem; /* p-1 rounded-md */
  border-radius: 0.375rem; /* rounded-md */
  font-weight: bold;
  color: white ;

  @media (max-width: ${breakpoints.mobile}) {
    text-align: center;
    font-size: 1.25rem;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 1rem; /* p-1 */

  @media (max-width: ${breakpoints.mobile}) {
    
    align-items: flex-start;
  }
`;

const Price = styled.p`
  font-weight: bold;
  border: solid white 1px;
  padding: 0.25rem 0.5rem; /* p-1 rounded-md */
  border-radius: 0.375rem; 
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem; /* Ajustamos el tamaño de la fuente */
  }
`;

const PriceValue = styled.p`
  background-color: #ffffff58; /* bg-[#ffffff58] */
  padding: 0.25rem 0.5rem; /* p-1 rounded-md */
  border-radius: 0.375rem; /* rounded-md */
  font-weight: bold;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem; /* Ajustamos el tamaño de la fuente */
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem; /* p-5 */
  text-align: center;
  font-size: 0.75rem; /* text-xs */

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    padding: 0.5rem;
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.3333%;
  border-bottom: 1px solid white;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 5px;
  width: 100%;
  color: #003c71;
  font-weight: bold;
  border-radius: 0.25rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%; /* Hacemos que el botón ocupe más espacio en móviles */
  }

  &:hover {
    background-color: #003c71;
    color: white;
  }
`;

interface CardProps {
  property: PropertyData;
  userRole?: string;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ property, userRole, onDelete }) => {

  const handleDelete = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProperty(String(property.id)); // Llamar a la función que elimina la propiedad
          alertSuccess("Eliminada", "Propiedad eliminada exitosamente");
          onDelete(); // Refrescar la lista después de eliminar
        } catch (error) {
          console.error("Error eliminando la propiedad:", error);
          Swal.fire("Error", "Ocurrió un error al eliminar la propiedad", "error");
        }
      }
    });
  };

  return(
    <CardContainer>
      <ImageContainer>
        <Image src="/assets/img/HERO.png" alt="place" />
      </ImageContainer>
      <InfoContainer>
        <div className="bg-[#ffffff] flex flex-row justify-center items-center p-1">
          <Title>{property.location}</Title>
          <TypeSale>{property.type_sale}</TypeSale>
        </div>
        <PriceContainer>
          <Price>Precio</Price>
          <PriceValue>{property.price}</PriceValue>
        </PriceContainer>
        <DetailsContainer>
          <div className="flex">
            <Detail>
              <p className="font-bold ">Habitaciones</p>
              <p className="p-2 font-bold">{property.rooms}</p>
            </Detail>
            <Detail>
              <p className="font-bold ">Baños</p>
              <p className="p-2 font-bold">{property.bathrooms}</p>
            </Detail>
            <Detail>
              <p className="font-bold ">Área</p>
              <p className="p-2 font-bold">{property.area}</p>
            </Detail>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              height: "max-content",
              padding: "0.75rem",
            }}
          >
            <Link href={`/pages/details-property/${property.id}`} className="w-2/6 no-underline">
              <Button>Ver</Button>
            </Link>
            {userRole === "admin" || userRole === "client" ? (
              <Link href={`/pages/edit-property/${property.id}`} className="w-2/6 no-underline">
                <Button>Editar</Button>
              </Link>
            ) : null}
            {userRole === "admin" ? (
              <Button onClick={handleDelete} className="w-2/6">
                Eliminar
              </Button>
            ) : null}
          </div>
        </DetailsContainer>
      </InfoContainer>
    </CardContainer>
  );
} 
  
export default Card;

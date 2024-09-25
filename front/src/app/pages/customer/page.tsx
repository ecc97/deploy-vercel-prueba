"use client";

import Nav from "../../../components/Nav";
import FooterPage from "../../../components/Footer";
import Card from "../../../components/Cards";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserData } from "../../../interfaces/IDataUser";
import { PropertyData } from "../../../types/PropertyData";
import { getProperties } from "../../../api/properties";

const ClientProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userProperties, setUserProperties] = useState<PropertyData[]>([]);
  const [otherProperties, setOtherProperties] = useState<PropertyData[]>([])
  const router = useRouter();

   // Definir la función loadProperties fuera del useEffect para que esté disponible en toda la componente
   const loadProperties = async () => {
    const userLogged = localStorage.getItem("userData");

    if (userLogged) {
      const parsedUserData: UserData = JSON.parse(userLogged);
      const properties = await getProperties();

      if (properties) {
        const userProps = properties.filter(
          (property: PropertyData) => property.id_user === parsedUserData.id
        );
        const otherProps = properties.filter(
          (property: PropertyData) => property.id_user !== parsedUserData.id
        );
        setUserProperties(userProps);
        setOtherProperties(otherProps);
      }
    }
  };

  // useEffect para cargar las propiedades al montar el componente
  useEffect(() => {
    const userLogged = localStorage.getItem("userData");

    if (!userLogged) {
      router.push("/");
    } else {
      const parsedUserData: UserData = JSON.parse(userLogged);

      // Verificar si el rol es admin
      if (parsedUserData.role !== "client") {
        router.push("/"); // Redirigir si no es admin
      }

      setUserData(parsedUserData);
      loadProperties(); // Cargar propiedades al montar el componente
    }
  }, [router]);

  //Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("userData");
    router.push("/");
  };

  //Si no hay datos del usuario, retorna null mientras se carga la info
  if (!userData) {
    return null;
  }

  // const property = {
  //   id: "1",
  //   location: "Nombre propiedad",
  //   price: "2.000.000",
  //   rooms: "2",
  //   bathrooms: "1",
  //   area: "60",
  //   type_sale: "Arrienda"
  // }

  // const userData = {
  //   username: "Samuel Acevedo Ossa",
  //   email: "samuelacevedo9307@gmail.com",
  //   nickname: "samuelacevedo9307"
  // }

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="bg-[#003C71] text-white no-underline">
        {/*---------------MENU NAV---------------- */}
        <Nav />
      </div>
      {/*---------------SECTION INFORMATION USER CLIENT---------------- */}
      <section className="h-screen w-full flex flex-col justify-center items-center">
        <div className="info-profile-customer flex justify-around items-center h-3/4 w-4/6 gap-10 p-10">
          <div className=" h-full w-2/6 flex  justify-center items-center">
            <div className="bg-custom-gradient rounded-full h-72 w-72 bg-[#003C71]"></div>
          </div>
          <div className=" w-4/6 h-full p-10 flex justify-start items-center">
            <div className="bg-custom-gradient text-white text-3xl flex justify-around flex-col rounded-sm bg-[#003C71] h-72 w-full p-10 ">
              <h4 className="font-bold">
                Nombre: <span className="text-sm">{userData.username}</span>
              </h4>
              <h4 className="font-bold">
                Correo: <span className="text-sm">{userData.email}</span>
              </h4>
              <h4 className="font-bold">
                Nickname: <span className="text-sm">{userData.username}</span>
              </h4>
              <button
                className="w-30 h-12 text-base bg-white text-black"
                onClick={handleLogout}
              > Cerrar sesión </button>
            </div>
          </div>
        </div>
        {/*-------------- SUBTITLE TARGETS CUSTOMERS---------------- */}
        <div className="title-animation pt-10 pb-10 w-full border-2 border-y-[#003C71] border-t-[#003C71]-500">
          <h3 className="text-5xl text-[#003C71] text-center">
            Mis propiedades
          </h3>
          <h4 className="text-[#747474] text-center text-2xl">
            Descubre las nuevas tendencias e incorporaciones trasadas en el
            último mes.
          </h4>
        </div>
      </section>
      {/*-------------- SECTION TARGETS CUSTOMER---------------- */}
      <section className=" section-cards-customer h-screen flex justify-around items-center p-24  w-full ">
        {userProperties.map((property) => (
          <Card key={property.id} property={property} userRole={userData.role} onDelete={loadProperties} />
        ))}
      </section>
      <div className="flex justify-center p-10">
        <Link href="/pages/form-new-property">
          <button className="button-know-home text-[#003C71] rounded-sm shadow-[#003C71]-500/40 border-t-2 border-b-2 border-[#003C71] p-3">
            Agregar Propiedad
          </button>
        </Link>
      </div>

      {/*-------------- SUBTITLE ANOTHER PROPERTIES---------------- */}
      <div className=" title-animation pt-10 pb-10 w-full border-2 border-y-[#003C71] border-t-[#003C71]-500">
        <h3 className="text-5xl text-[#003C71] text-center">
          Otras propiedades
        </h3>
      </div>
      {/*-------------- SECTION ANOTHER PROPERTIES--------------- */}
      <section className="section-cards-another-properties flex justify-around items-center p-24 h-full w-full">
        {otherProperties.map((property) => (
          <Card key={property.id} property={property} userRole={userData.role} onDelete={loadProperties} />
        ))}
      </section>
      <div className="flex justify-center p-10">
        <button className="button-know-home text-[#003C71] rounded-sm shadow-[#003C71]-500/40 border-t-2 border-b-2 border-[#003C71] p-3">
          Conoce más
        </button>
      </div>
      {/*-------------- FOOTER---------------- */}
      <FooterPage />
    </div>
  );
};

export default ClientProfilePage;

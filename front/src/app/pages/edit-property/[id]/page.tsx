"use client";

import { useState, useEffect } from "react";
import { updateProperty, getPropertyById } from "../../../../api/properties";
import { UserData } from "../../../../interfaces/IDataUser";
import { PropertyData } from "../../../../types/PropertyData";
import { alertSuccess } from "../../../../components/alerts/Alerts.component";
import Nav from "../../../../components/Nav";
import InputFile from "../../../../components/ui/InputFile";
import FooterPage from "../../../../components/Footer";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation"
import { uploadImageToCloudinary } from "../../../../utils/uploadImg";

const initialState: PropertyData = {
  location: "",
  price: "",
  rooms: "",
  bathrooms: "",
  area: "",
  type_sale: "",
  images: ['', '', '', '', ''],
  id_user: "",
};

const EditProperty: React.FC = () => {
  const { id: propertyId } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formDataPro, setFormDataPro] = useState<PropertyData>(initialState);
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  
  const router = useRouter();

  //useEffect para verificar si el usuario está autenticado
  useEffect(() => {
    const userLogged = localStorage.getItem("userData");
  
    if (!userLogged) {
      router.push("/");
    } else {
      const parsedUserData: UserData = JSON.parse(userLogged);
      setUserData(parsedUserData);
      
  
      if (propertyId) {
        getPropertyById(String(propertyId)).then((property) => {
          if (property) {
            setPropertyData(property);
            setFormDataPro({
              ...formDataPro,
              ...property,
              id_user: parsedUserData.id,
            });
          }
        }).catch((error) => {
          console.error("Error obteniendo la propiedad:", error);
        });
      }
    }
  }, [propertyId, router]);

  const handleImageUpload = async (index: number, file: File) => {
    const newImages = await uploadImageToCloudinary(file, index, formDataPro.images || []);
    setFormDataPro(prev => ({ ...prev, images: newImages }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormDataPro({
      ...formDataPro,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (propertyData) {
        const updatedProperty = await updateProperty(String(propertyData.id), formDataPro);
        alertSuccess("Propiedad actualizada", "La propiedad fue editada exitosamente.");
        localStorage.setItem("propertyData", JSON.stringify(updatedProperty));
        setFormDataPro(initialState);
        if(userData?.role === "admin") {
          router.push("/pages/admin");
        } else if (userData?.role === "client") {
          router.push("/pages/customer");
        }
      }
    } catch (error) {
      console.error("Error actualizando la propiedad:", error);
    }
  };

  if (!userData) {
    return null;
  }

  return (
    <>
      <div className="bg-[#003C71]">
        {/*---------------MENU NAV---------------- */}
        <Nav></Nav>
      </div>
      <div className="pt-10 pb-10 mt-10 mb-10 w-full border-2 border-b-[#003C71] border-t-[#003C71]">
        <h3 className="text-5xl text-[#003C71] text-center">Editar Propiedad</h3>
      </div>
      {/*--------------BUTTON RETURN---------------- */}
      <div className="p-10 flex justify-center items-center">
        <Link href="/pages/customer">
          <button className="button-know-home text-[#003C71] rounded-sm shadow-[#003C71]-500/40 border-t-2 border-b-2 border-[#003C71] p-3">Regresar</button>
        </Link>
      </div>
      <section className="p-20 w-full h-full flex flex-col lg:w-full flex justify-center items-center">
        {/* ------------information-------- */}
        <div className="information-propiety w-full h-full flex flex-col lg:w-8/12 flex justify-center items-center">
          <div className="w-full h-full flex justify-center items-center p-10">
            <img src="/assets/icons/icon-register-propiety.png" alt="propiety-form" className="h-48" />
          </div>
          <div className="form-information-propiety w-full h-full">
            <div className="w-full h-full">
              <div className="flex flex-col text-[#003c71] text-sm pt-2 lg:text-2xl">
                <label className="font-bold">Lugar:</label>
                <input
                  type="text"
                  name="location"
                  value={formDataPro.location}
                  onChange={handleChange}
                  className="border-b-2 border-[#003c71] text-[#003c71]"
                />
              </div>
              <div className="flex flex-col text-[#003c71] text-sm pt-2 lg:text-2xl">
                <label className="font-bold">Precio:</label>
                <input
                  type="text"
                  name="price"
                  value={formDataPro.price}
                  onChange={handleChange}
                  className="border-b-2 border-[#003c71] text-[#003c71]"
                />
              </div>
              <div className="flex flex-col text-[#003c71] text-sm pt-2 lg:text-2xl">
                <label className="font-bold">Numero de habitaciones:</label>
                <input
                  type="text"
                  name="rooms"
                  value={formDataPro.rooms}
                  onChange={handleChange}
                  className="border-b-2 border-[#003c71] text-[#003c71]"
                />
              </div>
            </div>
            <div className="info-col-2 flex flex-col justify-center items-center">
              <div className="flex flex-col text-[#003c71] text-sm pt-2 w-full lg:text-2xl">
                <label className="font-bold">Numero de baños:</label>
                <input
                  type="text"
                  name="bathrooms"
                  value={formDataPro.bathrooms}
                  onChange={handleChange}
                  className="border-b-2 border-[#003c71] text-[#003c71]"
                />
              </div>
              <div className="flex flex-col text-[#003c71] text-sm pt-2 w-full lg:text-2xl">
                <label className="font-bold">Área en metros cuadrados:</label>
                <input
                  type="text"
                  name="area"
                  value={formDataPro.area}
                  onChange={handleChange}
                  className="border-b-2 border-[#003c71] text-[#003c71]"
                />
              </div>
              <div className="flex flex-col text-[#003c71] text-sm pt-2 lg:text-2xl w-full">
                <label className="font-bold">Seleccione una opción:</label>
                <select
                  name="type_sale"
                  value={formDataPro.type_sale}
                  onChange={handleChange}
                  className="border-b-2 border-[#003c71] text-[#003c71] w-full"
                >
                  <option value="">----</option>
                  <option value="arrendador">Arrenda</option>
                  <option value="arrendatario">Venta</option>
                </select>
              </div>
              {/* ------------images icons-------- */}
              <div className="flex flex-row justify-around p-3 text-[#003c71] text-sm lg:w-8/12 flex justify-center items-center ">
              <label className="font-bold">Anexa tus imagenes:</label>
                <div className="flex space-x-2">
                  {formDataPro.images?.map((image, index) => (
                    <div key={index} className="relative">
                      <InputFile
                        id={`imagen-${index}`}
                        onChange={(e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            handleImageUpload(index, file);
                          }
                        }}
                        width="50px" 
                        height="50px" 
                        image={image}
                      />
                    </div>
                  )) || <p>No hay imágenes</p>}

                </div>
              </div>
            </div>
          </div>

          <div className="button-informatio-propiety pt-10 w-full h-full flex justify-center items-center">
            <button onClick={handleSubmit} className="button-know-home text-[#003C71] rounded-sm shadow-[#003C71]-500/40 border-t-2 border-b-2 border-[#003C71] p-3">
              Guardar Cambios
            </button>
          </div>
        </div>
      </section>
      <FooterPage></FooterPage>
    </>
  );
};

export default EditProperty;
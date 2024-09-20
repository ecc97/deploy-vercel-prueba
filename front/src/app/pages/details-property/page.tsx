"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react"; // Asegúrate de usar useEffect
import Nav from "@/components/Nav";
import FooterPage from "@/components/Footer";

export const DetailsPropiety: React.FC = () => {
  useEffect(() => {
    // Importar el JavaScript de Bootstrap después del renderizado del cliente
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <div className="bg-[#003C71]">
        {/*---------------MENU NAV---------------- */}
        <Nav></Nav>
      </div>
      <div className="pt-10 pb-10 w-full border-2 border-b-[#003C71] border-t-[#003C71]-500">
        <h3 className="text-5xl text-[#003C71] text-center">Caracteristicas</h3>
      </div>
      {/* ------------section carousel images-------- */}
      <div className="carousel-bootstrap w-full h-full">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/assets/img/habitacion1.jpg"
                className="d-block w-100"
                alt="Slide 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/assets/img/habitacion3.jpg"
                className="d-block w-100"
                alt="Slide 2"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/assets/img/habitacion2.jpg"
                className="d-block w-100"
                alt="Slide 3"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/assets/img/habitacion4.jpg"
                className="d-block w-100"
                alt="Slide 4"
              />
            </div>
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
      <section className="p-20 w-full h-full flex flex-col">
        {/* ------------information-------- */}
        <div className="information-propiety w-full h-full flex flex-col">
          <div className="form-information-propiety w-full h-full">
            <div className="w-full h-full">
              <div className="flex flex-col p-5 text-[#003c71] text-sm">
                <label className="font-bold">Lugar:</label>
                <input
                  type="text"
                  className="border-b-2 border-[#003c71]  text-[#003c71]"
                />
              </div>
              <div className="flex flex-col p-5 text-[#003c71] text-sm">
                <label className="font-bold">Precio:</label>
                <input
                  type="text"
                  className="border-b-2 border-[#003c71]  text-[#003c71]"
                />
              </div>
              <div className="flex flex-col p-5 text-[#003c71] text-sm">
                <label className="font-bold">Numero de habitaciones:</label>
                <input
                  type="text"
                  className="border-b-2 border-[#003c71]  text-[#003c71]"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col p-5 text-[#003c71] text-sm">
                <label className="font-bold">Numero de habitaciones:</label>
                <input
                  type="text"
                  className="border-b-2 border-[#003c71]  text-[#003c71]"
                />
              </div>
              <div className="flex flex-col p-5 text-[#003c71] text-sm">
                <label className="font-bold">Numero de habitaciones:</label>
                <input
                  type="text"
                  className="border-b-2 border-[#003c71]  text-[#003c71]"
                />
              </div>
              {/* ------------images icons-------- */}
              <div className="flex flex-row justify-around p-5 text-[#003c71] text-sm">
                <div className="w-1/6 h-1/6">
                  <img
                    src="/assets/icons/mas.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-1/6 h-1/6">
                  <img
                    src="/assets/icons/mas.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-1/6 h-1/6">
                  <img
                    src="/assets/icons/mas.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-1/6 h-1/6">
                  <img
                    src="/assets/icons/mas.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="button-informatio-propiety w-full h-full flex justify-center items-center">
            <button className="flex justify-center items-center w-36 h-10 bg-[#003C71] text-white">
              Editar
            </button>
          </div>
        </div>
      </section>
      <FooterPage></FooterPage>
    </>
  );
};

export default DetailsPropiety;

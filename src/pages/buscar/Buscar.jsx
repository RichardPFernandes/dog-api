import { FaSearch } from "react-icons/fa";
import "./Buscar.css";
import DogApiService from "../../service/dogApi";
import { useState } from "react";
import Card from "../../components/card/Card";
import docChorando from "../../assets/dogChorando.jpg";
export default function Buscar() {
  const [cachorros, setCachorros] = useState([]);
  function onSearch() {
    if (document.querySelector("input").value === "") {
      return;
    }
      DogApiService()
        .buscarRaca(document.querySelector("input").value)
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            DogApiService().buscarImagem(data[i].reference_image_id).then((image) => {
              data[i].image = image;
              setCachorros(data);
            });
          }
           document.querySelector(".buscar").classList.add("active");
           document.querySelector(".buscar_result").style.display = "grid";
        });

      
  }

  function closeSearch() {
    if (document.querySelector("input").value === "") {
      document.querySelector(".buscar").classList.remove("active");
      document.querySelector(".buscar_result").style.display = "none";
      setCachorros([]);
    }
  }

  return (
    <div className="buscar">
      <div className="buscar_main">
        <header className="buscar_header">
          <h1>Buscar Pela Raça</h1>
        </header>
        <main className="buscar_input">
          <input
            type="text"
            placeholder="Digite a raça do cachorro"
            onChange={closeSearch}
          />
          <button onClick={onSearch}>
            <FaSearch />
          </button>
        </main>
      </div>
      <div className="buscar_result">
        <main className="buscar_result_main">
          {cachorros.length === 0 ? (
            <div style={{ gridColumn: "1 / -1" }}>
              <Card
                cachorro={{
                  name: "Nenhum cachorro encontrado",
                  image: { url: docChorando },
                }}
              />
            </div>
          ) : (
            cachorros.map((cachorro) => (
              <div className="cachorro" key={cachorro.id}>
                <div className="cachorro_info">
                  <img
                    src={cachorro.image && cachorro.image.url}
                    alt={cachorro.name}
                  />
                  <p>Origem: {cachorro.origin}</p>
                  <p>Raça: {cachorro.name}</p>
                </div>
                <div
                  className="cachorro_buttons"
                  style={{ justifyContent: "center" }}
                >
                  <button style={{ width: "300px", margin: "0 10px" }}>
                    Ver Detalhes{" "}
                  </button>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}

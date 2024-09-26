import "./favs.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);
  useEffect(() => {
    const minhaLista = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(minhaLista) || []);

  }, []);

  function movieRemover(id) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });
    setFilmes(filtroFilmes);
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
    toast.success("Filme removido com sucesso!");
  }

  return (
    <div className="meus-favs">
      <h1>Lista de favoritos</h1>
      {filmes.length === 0 && <span>Você não possui nenhum filme salvo!</span>}
      <ul className="filmes-favs">
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button className="button-exclude">
                  <img  onClick={() => movieRemover(item.id)} src="delete_24dp_8B1A10_FILL0_wght400_GRAD0_opsz24.png" alt="Excluir"/>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Favoritos;

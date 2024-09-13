import "./favs.css";
import { useEffect, useState } from "react";
import { Link, json } from "react-router-dom";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);
  useEffect(() => {
    const minhaLista = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function movieRemover(id) {
    let filtroFilmes = filmes.filter((item)=>{
        return(item.id !== id)
    })
    setFilmes(filtroFilmes);
    localStorage.setItem("@primeflix",JSON.stringify(filtroFilmes))
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
                <button onClick={() => movieRemover(item.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Favoritos;
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

///movie/now_playing?api_key=6da9bc1126f946dc584fc9cf189df925

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "6da9bc1126f946dc584fc9cf189df925",
          language: "pt-BR",
          page: 1,
        },
      });
      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
    }
    carregarFilmes();
  }, []);


  if(loading){
    return(
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((item) => {
          return (
            <article className="post" key={item.id}>
              <span className="filmes">
                <strong className="titulo">{item.original_title}</strong>
                <img
                  className="capa"
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  alt={item.title}
                />
                <Link className="botao" to={`/filme/${item.id}`}>
                  Acessar
                </Link>
              </span>
            </article>
          );
        })}
      </div>
    </div>
  );
}
export default Home;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./details.css";
import api from "../../services/api";
import { Link } from "react-router-dom";


function Filme() {
  const [filmes, setFilmes] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    async function carregarFilmes() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "6da9bc1126f946dc584fc9cf189df925",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilmes(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme nao encontrado!");
          navigation("/", {replace: true});
          return;
        });
   
    }

    carregarFilmes();

    return () => {
      console.log("Componente foi desmontado");
    };
  }, [navigation,id]);


  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasMovie = filmesSalvos.some((filmeSalvo)=> filmeSalvo.id === filmes.id)
    if(hasMovie){
      alert("Esse filme já foi salvo na lista!");
      return;
    }
    filmesSalvos.push(filmes);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    alert("Filme salvo com sucesso!");
  }



  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }
  return (
    <div className="filme-info">
      <h1 className="detailTitle">{filmes.title}</h1>
      <img
        className="detailsimg"
        src={`https://image.tmdb.org/t/p/original/${filmes.backdrop_path}`}
      />
      <h3 className="detailSinopsis">Sinopse</h3>
      <span className="detailOverview">{filmes.overview}</span>
      <span className="detailRate">
        Avaliação: {filmes.vote_average.toFixed(1)}/10
      </span>

      <div className="details-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filmes.original_title} trailer`}>Trailer</a>
        </button>
      </div>
    </div>
  );
}
export default Filme;

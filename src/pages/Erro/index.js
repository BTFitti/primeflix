import './style.css'
import { Link } from 'react-router-dom';
function Erro(){
    return(
        <div className='error'>
            <h1>404</h1>
            <h2>Parece que esta página não existe!</h2>
            <Link className='voltar' to={"/"}>Voltar a página home</Link>
        </div>
    )
}
export default Erro;

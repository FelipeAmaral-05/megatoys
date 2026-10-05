import { Link } from "react-router-dom"
export default function NotFound(){
return <div style={{padding:80, textAlign:"center"}}><h1 style={{color:"#39FF14", fontSize:60}}
>404</h1><p>Página não encontrada</p><Link to="/">Voltar ao início</Link></div>
}
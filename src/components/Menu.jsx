import { Link, useLocation } from "react-router-dom"
export default function Menu({busca,setBusca,carrinho,setMostrarCarrinho}){
const loc=useLocation()
return(<header className="header"><Link to="/"><div className="logo">megatoys</div></
Link><nav className="menu"><Link to="/" className={loc.pathname==="/"? "ativo":""}
>Inicio</Link><Link to="/produtos" className={loc.pathname==="/produtos"? "ativo":""}
>Loja</Link><Link to="/categorias">Novidades</Link><Link to="/sobre">Sobre</Link><Link

to="/contato">Contato</Link></nav><div className="search-wrap"><div className="search-
bar">

🔍

<input value={busca} onChange={e=>setBusca(e.target.value)}
placeholder="Buscar..." /></div></div><div className="icons"><div className="icon-cart"
onClick={()=>setMostrarCarrinho(true)}>

🛒

{carrinho.length>0 && <span

className="badge">{carrinho.reduce((s,i)=>s+i.qtd,0)}</span>}</div></div></header>)
}
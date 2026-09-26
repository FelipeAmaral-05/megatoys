import { useState } from "react"
export default function Carrinho({carrinho,setCarrinho,setMostrar}){
const [pag,setPag]=useState("pix"); const total=carrinho.reduce((s,i)=>s+i.valor*i.qtd,0)
const remover=(id)=>setCarrinho(p=>p.filter(i=>i.id!==id)); const
qtd=(id,d)=>setCarrinho(p=>p.map(i=>i.id===id?{...i,qtd:i.qtd+d}:i).filter(i=>i.qtd>0))
return(<div className="carrinho-overlay" onClick={()=>setMostrar(false)}><div
className="carrinho" onClick={e=>e.stopPropagation()}><h3
style={{color:"#",display:"flex",justifyContent:"space-between"}}>Carrinho
({carrinho.reduce((s,i)=>s+i.qtd,0)})<span onClick={()=>setMostrar(false)}
style={{cursor:"pointer"}}>X</span></h3>{carrinho.length===0 && <p style={{fontSize:"12px"}}
>Vazio</p>}{carrinho.map(item=>(<div key={item.id} className="carrinho-item"><img
src={item.img} /><div style={{flex:1}}><div style={{fontSize:"11px"}}>{item.nome}</div><div
style={{color:"#"}}>{item.preco}</div><div className="qtd"><button
onClick={()=>qtd(item.id,-1)}>-</button><span>{item.qtd}</span><button
onClick={()=>qtd(item.id,1)}>+</button><button onClick={()=>remover(item.id)}>

🗑

</button></
div></div></div>))}{carrinho.length>0 && <><div style={{marginTop:"12px",fontWeight:900}}
>Total: <span style={{color:"#"}}>R$ {total.toFixed(2)}</span></div><div
className="pagamento"><label><input type="radio" checked={pag==="pix"}
onChange={()=>setPag("pix")} /> PIX 10% OFF</label><label><input type="radio"
checked={pag==="cartao"} onChange={()=>setPag("cartao")} /> Cartão 12x</

label><label><input type="radio" checked={pag==="boleto"}
onChange={()=>setPag("boleto")} /> Boleto 5% OFF</label><button className="btn-final"
onClick={()=>{alert(`Compra R$ ${total.toFixed(2)} via ${pag}`); setCarrinho([]);
setMostrar(false)}}>FINALIZAR COMPRA</button></div></>}</div></div>)
}
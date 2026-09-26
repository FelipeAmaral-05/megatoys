import { useState, useEffect } from "react"

export default function App(){
const verde = "#39FF14"
const [busca,setBusca]=useState("")
const [cat,setCat]=useState("TODOS")
const [cart,setCart]=useState([])
const [openCart,setOpenCart]=useState(false)
const [slide,setSlide]=useState(0)
const [pagina,setPagina]=useState("Inicio")
const [paginaLoja,setPaginaLoja]=useState(1)

const banners = [
{ titulo: "JOGUE GRANDE. CONSTRUA GRANDE.", sub: "Brinquedos, blocos, pelúcias, jogos de tabuleiro e muito mais.", img: `${import.meta.env.BASE_URL}banner1.jpg.JPG` },
{ titulo: "OFERTAS IMPERDÍVEIS!", sub: "Até 50% OFF essa semana com super desconto.", img: `${import.meta.env.BASE_URL}banner2.jpg.JPG` },
{ titulo: "NOVIDADES QUE CHEGARAM!", sub: "Lançamentos LEGO, Hot Wheels e Barbie.", img: `${import.meta.env.BASE_URL}banner3.jpg.JPG` },
]

useEffect(()=>{ const t=setInterval(()=>setSlide(s=>(s+1)%3),4000); return()=>clearInterval(t) },[])

const nomes = {
"Bonecos": ["Homem Aranha 30cm","Batman 30cm","Superman","Hulk Gigante","Iron Man","Thor","Barbie Médica","Barbie Sereia","Ken Praia","Baby Alive","Polly Pocket","LOL Surprise","Monster High","Patrulha Canina","Transformers","Naruto","Goku","Ladybug","Power Rangers","Stitch"],
"Blocos de Montar": ["Kit Blocos 500 Peças","LEGO Cidade Polícia","LEGO Castelo","LEGO Nave","Blocos 1000 Peças","Alfabeto 26 Letras","Animais Fazenda","Trem Elétrico","Dinossauro T-Rex","Casa Moderna","Robô Gigante","Avião Caça","Fórmula 1","Forte Militar","Números","Gigante 50cm","Aeroporto","Bebê Encaixe","Pirâmide","Ponte"],
"Carrinhos": ["Hot Wheels 5 Pack","Pista Loop Infinito","Controle Remoto Drift","Bombeiro Escada","Ambulância Som","Polícia Luz","McQueen Falante","Fórmula 1 Ferrari","Garagem 3 Andares","Moto Yamaha","Jipe Safari","Ônibus Escolar","Cegonha 4 Carros","Trator Arado","Fricção Dino","Pista Vulcão","Off Road","Lixo Caçamba","Helicóptero","Jato Supersônico"],
"Jogos de Tabuleiro": ["Desafio da Selva","Banco Imobiliário","Detetive","Jogo da Vida","War","Uno","Xadrez","Damas","Ludo","Pula Pirata","Cara a Cara","Imagem e Ação","Jenga Torre","Twister","Dominó","Bingo","Perfil","Quebra Cabeça 500pc","Monopoly Junior","Memória Animais"],
"Pelúcias": ["Dinossauro T-Rex 35cm","Urso Teddy 60cm","Unicórnio Arco Íris","Stitch 30cm","Pikachu 25cm","Vira Lata","Gato Cinza","Leão Rei","Elefante Bebê","Coelho Branco","Tartaruga","Polvo Reversível","Capivara 40cm","Panda Fofo","Girafa","Jacaré 50cm","Baleia Azul","Pinguim","Macaco Banana","Cobra 1 Metro"],
"Educativos": ["Alfabeto Madeira","Números 1 a 20","Tapete EVA","Lousa Mágica","Massa 12 Cores","Ábaco 100 Contas","Relógio Horas","Mapa Mundi","Corpo Humano","Sistema Solar","Microscópio 100x","Slime Colorido","Kit Cientista","Cubo Mágico","Quebra Cabeça 3D","Formas Geométricas","Libras Alfabeto","Kit Pintura","Dominó Frutas","Balança Matemática"]
}

const produtos=[]
let id=1
Object.keys(nomes).forEach(c=>{
nomes[c].forEach(n=>{
produtos.push({id, nome:n, cat:c, preco: parseFloat((29.90+id*2.1).toFixed(2)), tag:["25% OFF","NOVIDADE","MAIS VENDIDO","OFERTA"][id%4], img:"https://loremflickr.com/400/400/toy?lock="+id, aval:30+id})
id++
})
})
produtos[0].img="/prod1.jpg"; produtos[0].preco=219.90
produtos[1].img="/prod2.jpg"; produtos[1].preco=189.90
produtos[2].img="/prod3.jpg"; produtos[2].preco=89.90
produtos[3].img="/prod4.jpg"; produtos[3].preco=149.90

const listaBase = produtos.filter(p=> (p.nome.toLowerCase().includes(busca.toLowerCase()) || p.cat.toLowerCase().includes(busca.toLowerCase())) && (cat==="TODOS" || p.cat===cat))
const itensLoja = listaBase.slice(0,100)
const porPagina = 20
const totalPagLoja = Math.ceil(itensLoja.length / porPagina)
const inicioLoja = (paginaLoja-1)*porPagina
const listaLoja = itensLoja.slice(inicioLoja, inicioLoja+porPagina)
const listaNovidades = [...produtos].sort((a,b)=>b.id-a.id).slice(0,20)
const listaOfertas = produtos.filter(p=> p.tag==="OFERTA" || p.tag==="25% OFF").slice(0,24)

function add(p){ setCart(o=>{ const ex=o.find(x=>x.id===p.id); if(ex) return o.map(x=>x.id===p.id?{...x,qtd:x.qtd+1}:x); return [...o,{...p,qtd:1}]}); setOpenCart(true) }
function inc(id){ setCart(o=>o.map(i=>i.id===id?{...i,qtd:i.qtd+1}:i)) }
function dec(id){ setCart(o=>o.map(i=>i.id===id?{...i,qtd:i.qtd-1}:i).filter(i=>i.qtd>0)) }
function removeItem(id){ setCart(o=>o.filter(i=>i.id!==id)) }

const qtd = cart.reduce((s,i)=>s+i.qtd,0)
const subtotal = cart.reduce((s,i)=>s+i.preco*i.qtd,0)
const frete = subtotal>200||subtotal===0?0:19.90
const total = subtotal+frete

const categorias = [{nome:"Bonecos",icon:"🤖"},{nome:"Blocos de Montar",icon:"🧱"},{nome:"Carrinhos",icon:"🏎️"},{nome:"Jogos de Tabuleiro",icon:"🎲"},{nome:"Pelúcias",icon:"🧸"},{nome:"Educativos",icon:"🧠"}]

const Card = ({p}) => (
<div style={{border:"1px solid #1e3a1e", borderRadius:"12px", background:"#0a0a0a", overflow:"hidden", position:"relative"}}>
<div style={{position:"absolute", top:"8px", left:"8px", background:verde, color:"black", fontSize:"9px", fontWeight:900, padding:"3px 7px", borderRadius:"5px", zIndex:2}}>{p.tag}</div>
<img src={p.img} alt={p.nome} loading="lazy" style={{width:"100%", height:"150px", objectFit:"cover", background:"white"}} onError={e=>e.target.src="https://picsum.photos/seed/megatoys"+p.id+"/400/400"}/>
<div style={{padding:"10px", textAlign:"center"}}>
<div style={{fontSize:"11px", fontWeight:700, height:"32px"}}>{p.nome}</div>
<div style={{color:verde, fontSize:"11px"}}>★★★★★ <span style={{color:"#555"}}>({p.aval})</span></div>
<div style={{color:verde, fontWeight:900, fontSize:"15px", marginTop:"4px"}}>R$ {p.preco.toFixed(2).replace(".",",")}</div>
<button onClick={()=>add(p)} style={{width:"100%", background:verde, color:"black", border:"none", padding:"8px", borderRadius:"8px", fontWeight:900, marginTop:"8px", fontSize:"12px", cursor:"pointer"}}>COMPRAR</button>
</div>
</div>
)

return(
<div style={{background:"#050505", minHeight:"100vh", color:"white", fontFamily:"Arial"}}>
<header style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 32px 12px 32px", position:"sticky", top:0, zIndex:100, background:"#050505"}}>
<div style={{color:verde, fontWeight:900, fontSize:"42px", lineHeight:"0.8", cursor:"pointer"}} onClick={()=>setPagina("Inicio")}>MEGA<br/>TOYS</div>
<div style={{display:"flex", gap:"32px", fontSize:"18px", fontWeight:700}}>
{["Inicio","Loja","Novidades","Ofertas","Sobre"].map(m=>(
<span key={m} onClick={()=>{setPagina(m); setPaginaLoja(1); window.scrollTo(0,0)}} style={{cursor:"pointer", color: pagina===m?verde:"#777", borderBottom: pagina===m?"3px solid "+verde:"none", paddingBottom:"4px"}}>{m}</span>
))}
</div>
<div style={{color:verde, fontSize:"26px", display:"flex", gap:"18px"}}>
<span>🔍</span><span>♡</span>
<span onClick={()=>setOpenCart(true)} style={{position:"relative", cursor:"pointer"}}>🛒<sup style={{background:verde, color:"black", borderRadius:"50%", padding:"2px 7px", fontSize:"12px", fontWeight:900}}>{qtd}</sup></span>
</div>
</header>

<div style={{display:"flex", justifyContent:"center", marginBottom:"12px"}}>
<div style={{width:"680px", border:"1.8px solid "+verde, borderRadius:"24px", padding:"12px 18px", display:"flex", gap:"10px", background:"#0a0a0a", boxShadow:"0 0 15px "+verde+"30"}}>
<span style={{color:verde}}>🔍</span>
<input value={busca} onChange={e=>{setBusca(e.target.value); if(e.target.value) setPagina("Loja")}} placeholder="Buscar brinquedos, marcas e categorias..." style={{flex:1, background:"transparent", border:"none", outline:"none", color:"white", fontSize:"14px"}}/>
</div>
</div>

{pagina==="Inicio" && (
<>
{/* BANNER ANTIGO ELABORADO - SÓ CORRIGI PARA NÃO CORTAR */}
<div style={{margin:"0 28px", borderRadius:"12px", overflow:"hidden", height:"220px", position:"relative", background:"#000", border:"1px solid #1a3a1a"}}>
{banners.map((b,i)=>(
<div key={i} style={{position:"absolute", inset:0, display:i===slide?"block":"none", background:"#000"}}>
{/* CORREÇÃO: contain + 68% + right center = NÃO CORTA */}
<img src={b.img} style={{position:"absolute", right:0, top:0, width:"68%", height:"100%", objectFit:"contain", objectPosition:"right center", background:"#000"}}/>
<div style={{position:"absolute", inset:0, background:"linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 38%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.05) 100%)"}}></div>
<div style={{position:"absolute", inset:0, background:"radial-gradient(ellipse at 65% 50%, "+verde+"14 0%, transparent 60%)"}}></div>
<div style={{position:"absolute", left:"30%", top:"20%", width:"35%", height:"1px", background:verde, opacity:0.4, transform:"rotate(-15deg)", boxShadow:"0 0 8px "+verde}}></div>
<div style={{position:"absolute", left:"35%", bottom:"25%", width:"40%", height:"1px", background:verde, opacity:0.3, transform:"rotate(10deg)", boxShadow:"0 0 8px "+verde}}></div>

<div style={{position:"relative", zIndex:2, height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", padding:"20px 28px", maxWidth:"42%"}}>
<div style={{color:verde, fontWeight:900, fontSize:"30px", lineHeight:"0.9"}}>{b.titulo}</div>
<div style={{fontSize:"11px", color:"#ddd", marginTop:"8px", lineHeight:"1.3"}}>{b.sub}<br/>Pagamento em até 12x sem juros • Frete grátis acima de R$ 200.</div>
<div style={{display:"flex", gap:"10px", marginTop:"14px"}}>
<button onClick={()=>setPagina("Ofertas")} style={{background:verde, color:"black", border:"none", padding:"8px 20px", borderRadius:"6px", fontWeight:900, fontSize:"12px", cursor:"pointer"}}>Ver Ofertas</button>
<button onClick={()=>setPagina("Novidades")} style={{background:"transparent", border:"1px solid "+verde, color:verde, padding:"8px 20px", borderRadius:"6px", fontWeight:900, fontSize:"12px", cursor:"pointer"}}>Novidades</button>
</div>
</div>
</div>
))}
</div>

<div style={{padding:"14px 28px 0"}}>
<div style={{fontWeight:900}}>Categorias<div style={{width:"30px", height:"3px", background:verde, marginTop:"4px"}}></div></div>
<div style={{display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:"10px", marginTop:"10px"}}>
{categorias.map(c=>(
<div key={c.nome} onClick={()=>{setCat(c.nome===cat?"TODOS":c.nome); setPagina("Loja")}} style={{border:"1.5px solid "+verde, background:"#0a0a0a", borderRadius:"12px", padding:"16px 6px", textAlign:"center", cursor:"pointer", boxShadow:"0 0 10px "+verde+"40"}}>
<div style={{fontSize:"28px", height:"38px", display:"flex", justifyContent:"center", alignItems:"center"}}>{c.icon}</div>
<div style={{fontSize:"11px", fontWeight:700, marginTop:"8px"}}>{c.nome}</div>
</div>
))}
</div>
</div>

<div style={{padding:"16px 28px 20px"}}>
<div style={{fontWeight:900}}>Produtos em Destaque <span style={{color:"#666", fontSize:"11px"}}>({listaBase.length} de 120)</span><div style={{width:"30px", height:"3px", background:verde, marginTop:"4px"}}></div></div>
<div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"14px", marginTop:"12px"}}>
{listaBase.slice(0,12).map(p=> <Card key={p.id} p={p} />)}
</div>
</div>
</>
)}

{pagina==="Loja" && (
<div style={{padding:"16px 28px 20px"}}>
<div style={{fontWeight:900, fontSize:"22px"}}>Loja - Todos os Brinquedos <span style={{color:verde}}>• 4 por linha • 20 por página</span></div>
<div style={{fontSize:"12px", color:"#888", marginTop:"4px"}}>Mostrando {inicioLoja+1} - {Math.min(inicioLoja+porPagina, itensLoja.length)} de {itensLoja.length} itens • Página {paginaLoja} de {totalPagLoja} • Categoria: {cat}</div>
<div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"14px", marginTop:"16px"}}>
{listaLoja.map(p=> <Card key={p.id} p={p} />)}
</div>
<div style={{display:"flex", justifyContent:"center", gap:"8px", marginTop:"22px", flexWrap:"wrap"}}>
<button disabled={paginaLoja===1} onClick={()=>setPaginaLoja(p=>p-1)} style={{padding:"8px 14px", borderRadius:"8px", border:"1px solid "+verde, background: paginaLoja===1?"#222":"transparent", color:verde, cursor:"pointer"}}>‹ Anterior</button>
{Array.from({length: totalPagLoja}, (_,i)=>i+1).map(n=>(
<button key={n} onClick={()=>{setPaginaLoja(n); window.scrollTo(0,0)}} style={{padding:"8px 14px", borderRadius:"8px", border:"1px solid "+verde, background: n===paginaLoja?verde:"#111", color: n===paginaLoja?"black":verde, fontWeight:900, cursor:"pointer"}}>{n}</button>
))}
<button disabled={paginaLoja===totalPagLoja} onClick={()=>setPaginaLoja(p=>p+1)} style={{padding:"8px 14px", borderRadius:"8px", border:"1px solid "+verde, background: paginaLoja===totalPagLoja?"#222":"transparent", color:verde, cursor:"pointer"}}>Próxima ›</button>
</div>
</div>
)}

{pagina==="Novidades" && (
<div style={{padding:"16px 28px 20px"}}>
<div style={{fontWeight:900, fontSize:"22px"}}>Novidades <span style={{color:verde}}>• Chegaram agora • {listaNovidades.length} lançamentos</span></div>
<div style={{fontSize:"12px", color:"#888", marginTop:"4px"}}>Os brinquedos mais novos que acabaram de chegar na loja!</div>
<div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"14px", marginTop:"16px"}}>
{listaNovidades.map(p=> <Card key={p.id} p={p} />)}
</div>
</div>
)}

{pagina==="Ofertas" && (
<div style={{padding:"16px 28px 20px"}}>
<div style={{fontWeight:900, fontSize:"22px"}}>Ofertas Imperdíveis <span style={{color:verde}}>• Até 50% OFF • {listaOfertas.length} produtos</span></div>
<div style={{fontSize:"12px", color:"#888", marginTop:"4px"}}>Promoção por tempo limitado! Frete grátis acima de R$ 200</div>
<div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"14px", marginTop:"16px"}}>
{listaOfertas.map(p=> <Card key={p.id} p={p} />)}
</div>
</div>
)}

{pagina==="Sobre" && (
<div style={{padding:"24px 28px", maxWidth:"1100px", margin:"0 auto"}}>
<div style={{border:"2px solid "+verde, borderRadius:"16px", padding:"28px", background:"#0a0a0a"}}>
<div style={{color:verde, fontWeight:900, fontSize:"42px", lineHeight:"0.9"}}>MEGA<br/>TOYS</div>
<h1 style={{color:verde, marginTop:"20px", fontSize:"28px"}}>Sobre a MegaToys</h1>
<div style={{color:"#ccc", lineHeight:"1.8", fontSize:"14px", marginTop:"12px"}}>
<p>A <b style={{color:verde}}>MegaToys</b> nasceu em 2015 em São Paulo com um sonho simples: fazer a alegria das crianças chegar em todo o Brasil com preço justo e entrega rápida.</p>
<p style={{marginTop:"12px"}}>Começamos como uma lojinha de bairro na Vila Mariana e hoje somos uma das maiores lojas de brinquedos online do Brasil, com mais de <b style={{color:verde}}>120 produtos</b> em 6 categorias: Bonecos, Blocos de Montar, Carrinhos, Jogos de Tabuleiro, Pelúcias e Educativos.</p>
<h3 style={{color:verde, marginTop:"20px"}}>🎯 Nossa Missão</h3>
<p>Levar diversão, aprendizado e desenvolvimento para crianças de 0 a 14 anos, com brinquedos seguros, criativos e que estimulam a imaginação.</p>
<h3 style={{color:verde, marginTop:"16px"}}>⭐ Por que comprar na MegaToys?</h3>
<ul style={{marginLeft:"20px", marginTop:"8px"}}>
<li>✅ <b>120 produtos</b> selecionados das melhores marcas: LEGO, Hot Wheels, Barbie, Marvel</li>
<li>✅ Frete grátis acima de R$ 200 para todo o Brasil</li>
<li>✅ Pagamento em até 12x sem juros no cartão</li>
<li>✅ Entrega rápida em até 5 dias úteis</li>
<li>✅ Produtos originais com garantia</li>
<li>✅ Atendimento humanizado via WhatsApp</li>
</ul>
<h3 style={{color:verde, marginTop:"16px"}}>📍 Nossa Loja Física</h3>
<p>Rua dos Brinquedos, 123 - Vila Mariana - São Paulo/SP<br/>CEP: 04001-001<br/>Segunda a Sábado das 9h às 19h</p>
<h3 style={{color:verde, marginTop:"16px"}}>📞 Fale Conosco</h3>
<p>WhatsApp: (11) 99999-9999<br/>E-mail: contato@megatoys.com.br<br/>Instagram: @megatoysbrasil</p>
</div>
<div style={{marginTop:"22px", display:"flex", gap:"12px"}}>
<button onClick={()=>setPagina("Loja")} style={{background:verde, color:"black", border:"none", padding:"12px 24px", borderRadius:"10px", fontWeight:900, cursor:"pointer"}}>IR PARA LOJA</button>
<button onClick={()=>setPagina("Ofertas")} style={{background:"transparent", border:"1px solid "+verde, color:verde, padding:"12px 24px", borderRadius:"10px", fontWeight:900, cursor:"pointer"}}>VER OFERTAS</button>
</div>
</div>
</div>
)}

<footer style={{background:"#0a0a0a", borderTop:"2px solid "+verde, padding:"32px 28px 16px", marginTop:"30px"}}>
<div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"20px"}}>
<div>
<div style={{color:verde, fontWeight:900, fontSize:"28px", lineHeight:"0.9"}}>MEGA<br/>TOYS</div>
<p style={{color:"#888", fontSize:"11px", marginTop:"10px", lineHeight:"1.5"}}>A maior loja de brinquedos online do Brasil. 120 produtos, 6 categorias, entrega para todo Brasil.</p>
<div style={{display:"flex", gap:"10px", marginTop:"12px", fontSize:"20px"}}>
<span>📷</span><span>📘</span><span>🎵</span><span>💬</span>
</div>
</div>
<div>
<b style={{color:verde, fontSize:"13px"}}>INSTITUCIONAL</b>
<div style={{color:"#888", fontSize:"11px", marginTop:"8px", lineHeight:"2"}}>
<div onClick={()=>setPagina("Sobre")} style={{cursor:"pointer"}}>Sobre a MegaToys</div>
<div>Nossa Loja Física</div>
<div>Trabalhe Conosco</div>
<div>Política de Privacidade</div>
<div>Trocas e Devoluções</div>
</div>
</div>
<div>
<b style={{color:verde, fontSize:"13px"}}>CATEGORIAS</b>
<div style={{color:"#888", fontSize:"11px", marginTop:"8px", lineHeight:"2"}}>
{categorias.map(c=>(
<div key={c.nome} onClick={()=>{setCat(c.nome); setPagina("Loja")}} style={{cursor:"pointer"}}>{c.nome}</div>
))}
</div>
</div>
<div>
<b style={{color:verde, fontSize:"13px"}}>ATENDIMENTO</b>
<div style={{color:"#888", fontSize:"11px", marginTop:"8px", lineHeight:"1.8"}}>
<div>📞 (11) 99999-9999</div>
<div>✉️ contato@megatoys.com.br</div>
<div>🕘 Seg a Sáb 9h às 19h</div>
<div style={{marginTop:"8px", color:verde, fontWeight:900}}>FRETE GRÁTIS acima de R$ 200</div>
<div style={{marginTop:"4px"}}>💳 12x sem juros no cartão</div>
</div>
</div>
</div>
<div style={{borderTop:"1px solid #222", marginTop:"20px", paddingTop:"12px", textAlign:"center", fontSize:"10px", color:"#666"}}>
MegaToys © 2024 - Todos os direitos reservados • CNPJ: 12.345.678/0001-99 • Rua dos Brinquedos, 123 - São Paulo/SP<br/>
Site 100% seguro • Produtos originais • Entrega garantida
</div>
</footer>

{openCart && (
<div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:999, display:"flex", justifyContent:"flex-end"}} onClick={()=>setOpenCart(false)}>
<div style={{width:"400px", background:"#111", borderLeft:"3px solid "+verde, padding:"16px", overflow:"auto", height:"100vh"}} onClick={e=>e.stopPropagation()}>
<div style={{display:"flex", justifyContent:"space-between", borderBottom:"1px solid #1e3a1e", paddingBottom:"10px"}}>
<b style={{color:verde, fontSize:"18px"}}>Carrinho ({qtd})</b>
<span onClick={()=>setOpenCart(false)} style={{cursor:"pointer", background:"#222", padding:"4px 10px", borderRadius:"10px"}}>X</span>
</div>
{cart.length===0? <div style={{textAlign:"center", color:"#777", marginTop:"40px"}}>Carrinho vazio 🛒<br/><button onClick={()=>{setOpenCart(false); setPagina("Loja")}} style={{marginTop:"12px", background:verde, color:"black", border:"none", padding:"8px 16px", borderRadius:"8px", fontWeight:900, cursor:"pointer"}}>Ir para Loja</button></div> :
<>
{cart.map(i=>(
<div key={i.id} style={{display:"flex", gap:"10px", padding:"10px 0", borderBottom:"1px solid #222", alignItems:"center"}}>
<img src={i.img} style={{width:"56px", height:"56px", borderRadius:"8px", background:"white"}}/>
<div style={{flex:1}}>
<div style={{fontSize:"11px", fontWeight:700}}>{i.nome}</div>
<div style={{color:verde, fontSize:"12px", fontWeight:900}}>R$ {i.preco.toFixed(2).replace(".",",")}</div>
<div style={{display:"flex", gap:"6px", marginTop:"6px", alignItems:"center"}}>
<button onClick={()=>dec(i.id)} style={{width:"24px", height:"24px", borderRadius:"50%", border:"1px solid "+verde, background:"transparent", color:verde, cursor:"pointer"}}>-</button>
<span style={{fontSize:"12px", fontWeight:900, minWidth:"16px", textAlign:"center"}}>{i.qtd}</span>
<button onClick={()=>inc(i.id)} style={{width:"24px", height:"24px", borderRadius:"50%", background:verde, color:"black", border:"none", cursor:"pointer", fontWeight:900}}>+</button>
</div>
</div>
<div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
<div style={{fontSize:"11px", fontWeight:900}}>R$ {(i.preco*i.qtd).toFixed(2).replace(".",",")}</div>
<button onClick={()=>removeItem(i.id)} style={{background:"#ff1744", color:"white", border:"none", padding:"3px 8px", borderRadius:"6px", fontSize:"10px", marginTop:"4px", cursor:"pointer"}}>🗑️ Excluir</button>
</div>
</div>
))}
<div style={{marginTop:"12px", borderTop:"1px solid #1e3a1e", paddingTop:"10px", fontSize:"12px"}}>
<div style={{display:"flex", justifyContent:"space-between"}}><span>Subtotal:</span><span>R$ {subtotal.toFixed(2).replace(".",",")}</span></div>
<div style={{display:"flex", justifyContent:"space-between"}}><span>Frete:</span><span style={{color: frete===0?verde:"#fff"}}>{frete===0?"GRÁTIS":"R$ "+frete.toFixed(2).replace(".",",")}</span></div>
<div style={{display:"flex", justifyContent:"space-between", fontWeight:900, fontSize:"14px", marginTop:"6px", color:verde}}><span>Total:</span><span>R$ {total.toFixed(2).replace(".",",")}</span></div>
</div>
<button onClick={()=>{alert("Compra finalizada! Total R$ " + total.toFixed(2).replace(".",",")); setCart([]); setOpenCart(false)}} style={{width:"100%", background:verde, color:"black", border:"none", padding:"14px", borderRadius:"10px", fontWeight:900, marginTop:"14px", cursor:"pointer", fontSize:"14px"}}>FINALIZAR COMPRA - R$ {total.toFixed(2).replace(".",",")}</button>
<button onClick={()=>setOpenCart(false)} style={{width:"100%", background:"transparent", border:"1px solid "+verde, color:verde, padding:"10px", borderRadius:"10px", fontWeight:900, marginTop:"8px", cursor:"pointer"}}>Continuar Comprando</button>
</>
}
</div>
</div>
)}
</div>
)
}
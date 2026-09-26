import Carrossel from "../components/Carrossel.jsx"
import Card from "../components/Card.jsx"
export default function Home({ produtosBase, busca, categoria, setCategoria, addCarrinho }) {
let lista = produtosBase
if (categoria !== "Todas") lista = lista.filter(p => p.cat === categoria)
if (busca) lista = lista.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()))
return (
<>
<Carrossel />
<div style={{ display: "flex", gap: "8px", padding: "15px", flexWrap: "wrap" }}>
{["Todas", "Bonecos", "Blocos de Montar", "Carrinhos", "Jogos de Tabuleiro", "Pelúcias"].map(c=> (<button key={c} onClick={() => setCategoria(c)} style={{ padding: "6px 12px", background:
categoria === c ? "#": "#222", color: categoria === c ? "#000": "#fff", border: "1px solid #",
borderRadius: "20px" }}>{c}</button>
))}
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "15px", padding:
"15px" }}>
{lista.slice(0, 16).map(p => <Card key={p.id} produto={p} onAdd={addCarrinho} />)}
</div>
</>
)
}
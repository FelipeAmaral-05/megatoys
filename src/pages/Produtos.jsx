import Card from "../components/Card.jsx"
export default function Produtos({ produtosBase, busca, addCarrinho }) {
let lista = produtosBase.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()))
return <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "15px", padding:
"15px" }}>{lista.map(p => <Card key={p.id} produto={p} onAdd={addCarrinho} />)}</div>
}
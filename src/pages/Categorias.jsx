import { useNavigate } from "react-router-dom"
export default function Categorias({ setCategoria }) {
const nav = useNavigate()
return (
<div style={{ padding: "20px", display: "flex", gap: "15px", flexWrap: "wrap" }}>

{["Bonecos", "Blocos de Montar", "Carrinhos", "Jogos de Tabuleiro", "Pelúcias"].map(c => (
<div key={c} onClick={() => { setCategoria(c); nav("/") }} style={{ background: "#111", color: "#",
border: "2px solid #", padding: "30px", borderRadius: "12px", cursor: "pointer", fontWeight:
900 }}>{c}</div>
))}
</div>
)
}
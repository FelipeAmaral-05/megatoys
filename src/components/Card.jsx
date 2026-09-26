export default function Card({ produto, onAdd }) {
return (
<div style={{ background: "#111", border: "2px solid #", borderRadius: "12px", padding: "12px",
color: "#fff" }}>
<img src={produto.img} style={{ width: "100%", height: "140px", objectFit: "cover",
borderRadius: "8px" }} />
<h4 style={{ margin: "10px 0 5px", fontSize: "13px", height: "32px", overflow: "hidden" }}
>{produto.nome}</h4>
<div style={{ color: "#", fontWeight: 900, fontSize: "16px" }}>{produto.preco}</div>
<div style={{ fontSize: "11px", color: "#888", marginBottom: "5px" }}>{produto.parc}</div>
<button onClick={() => onAdd(produto)} style={{ width: "100%", background: "#", color: "#000",
border: "none", padding: "10px", borderRadius: "8px", fontWeight: 900, fontSize: "14px" }}
>Add</button>
</div>
)
}
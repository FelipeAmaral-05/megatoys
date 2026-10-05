import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
export default function Checkout(){
const [cep,setCep]=useState(""); const [end,setEnd]=useState(null)
async function buscar(){
try{ const {data}=await axios.get(`https://viacep.com.br/ws/${cep}/json/`); setEnd(data);
toast.success("CEP ok!")}catch{toast.error("CEP inválido")}
}
return <div style={{padding:30}}><h2>Checkout ViaCEP</h2><input value={cep}
onChange={e=>setCep(e.target.value)} placeholder="CEP"/><button onClick={buscar}>Buscar</
button>{end && <p>{end.logradouro} - {end.localidade}</p>}<form
onSubmit={e=>{e.preventDefault(); toast.success("Compra finalizada!")}}><input required
placeholder="Nome" style={{width:"100%",padding:10,marginTop:20}}/><button
style={{width:"100%",padding:12,marginTop:10,background:"#39FF14"}}>Finalizar</button></
form></div>
}
const produtos = []
for (let i = 1; i <= 100; i++) {

const cats = ["Bonecos", "Blocos de Montar", "Carrinhos", "Jogos de Tabuleiro", "Pelúcias"]
produtos.push({
id: i,
nome: `Brinquedo ${i} - ${cats[i % 5]}`,
cat: cats[i % 5],
preco: `R$ ${(i * 2.5).toFixed(2)}`,
valor: i * 2.5,
img: `https://picsum.photos/200/200?random=${i}`,
tag: "Novo",
ava: "⭐ ⭐ ⭐ ⭐ ⭐",
parc: "10x sem juros"
})
}
export default produtos
const API_BASE = 'https://deisishop.pythonanywhere.com'
const LS_CHAVE = 'produtos-selecionados'

let produtosOriginais = []
let produtosVisiveis = []

document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem(LS_CHAVE)) localStorage.setItem(LS_CHAVE, '[]')
  inicializarUI()
  carregarCategorias()
  carregarProdutosAPI()
  window.addEventListener('hashchange', atualizarCesto)
})

function inicializarUI(){
  document.querySelector('#filtro-categoria').addEventListener('change', aplicarControles)
  document.querySelector('#ordenar').addEventListener('change', aplicarControles)
  document.querySelector('#pesquisar').addEventListener('input', aplicarControles)
  document.querySelector('#btn-comprar').addEventListener('click', checkout)
  const chk = document.querySelector('#estudante')
  const inp = document.querySelector('#cupao')
  if (chk) chk.addEventListener('change', atualizarCheckout)
  if (inp) inp.addEventListener('input', atualizarCheckout)
}

async function carregarProdutosAPI(){
  try{
    const res = await fetch(`${API_BASE}/products`)
    const data = await res.json()
    produtosOriginais = Array.isArray(data) ? data : (data.products || [])
    produtosVisiveis = [...produtosOriginais]
    renderProdutos(produtosVisiveis)
    atualizarCesto()
  }catch(e){
    produtosOriginais = []
    produtosVisiveis = []
    renderProdutos([])
  }
}

async function carregarCategorias(){
  try{
    const res = await fetch(`${API_BASE}/categories`)
    const cats = await res.json()
    const select = document.querySelector('#filtro-categoria')
    select.innerHTML = `<option value="">Todas as categorias</option>`
    ;(cats || []).forEach(c => {
      const op = document.createElement('option')
      op.value = c
      op.textContent = c
      select.append(op)
    })
  }catch(e){}
}

function aplicarControles(){
  const cat = document.querySelector('#filtro-categoria').value.trim().toLowerCase()
  const ord = document.querySelector('#ordenar').value
  const q = document.querySelector('#pesquisar').value.trim().toLowerCase()

  let lista = [...produtosOriginais]

  if (cat) lista = lista.filter(p => (p.category || '').toLowerCase() === cat)
  if (q) lista = lista.filter(p => (p.title || '').toLowerCase().includes(q))

  if (ord === 'asc') lista.sort((a,b) => Number(a.price) - Number(b.price))
  if (ord === 'desc') lista.sort((a,b) => Number(b.price) - Number(a.price))

  produtosVisiveis = lista
  renderProdutos(lista)
}

function renderProdutos(lista){
  const sec = document.querySelector('#produtos')
  sec.querySelectorAll('article').forEach(a => a.remove())
  lista.forEach(prod => sec.append(criarProdutoCard(prod)))
}

function criarProdutoCard(prod){
  const art = document.createElement('article')
  art.className = 'card'

  const h3 = document.createElement('h3')
  h3.textContent = prod.title

  const img = document.createElement('img')
  img.src = `https://deisishop.pythonanywhere.com${prod.image}`
  img.alt = prod.title

  const desc = document.createElement('p')
  desc.className = 'descricao'
  desc.textContent = (prod.description || '').toString().slice(0, 180)

  const preco = document.createElement('p')
  preco.className = 'preco'
  preco.textContent = `Preço: ${Number(prod.price).toFixed(2)} €`

  const btn = document.createElement('button')
  btn.type = 'button'
  btn.textContent = '+ Adicionar ao Cesto'
  btn.addEventListener('click', () => adicionarAoCesto(prod))

  art.append(h3, img, desc, preco, btn)
  return art
}

function obterCesto(){
  try{ return JSON.parse(localStorage.getItem(LS_CHAVE)) ?? [] } catch { return [] }
}
function guardarCesto(lista){
  localStorage.setItem(LS_CHAVE, JSON.stringify(lista))
}

function adicionarAoCesto(prod){
  const atual = obterCesto()
  const item = { id: prod.id, title: prod.title, price: Number(prod.price), image: prod.image }
  atual.push(item)
  guardarCesto(atual)
  atualizarCesto()
}

function removerDoCesto(index){
  const atual = obterCesto()
  atual.splice(index, 1)
  guardarCesto(atual)
  atualizarCesto()
}

function criarProdutoCesto(prod, index){
  const art = document.createElement('article')
  art.className = 'card'

  const h3 = document.createElement('h3')
  h3.textContent = prod.title

  const img = document.createElement('img')
  img.src = prod.image
  img.alt = prod.title

  const custo = document.createElement('p')
  custo.className = 'custo'
  custo.textContent = `Custo total: ${Number(prod.price).toFixed(2)} €`

  const btn = document.createElement('button')
  btn.type = 'button'
  btn.textContent = '− Remover do Cesto'
  btn.addEventListener('click', () => removerDoCesto(index))

  art.append(h3, img, custo, btn)
  return art
}

function totalBruto(){
  return obterCesto().reduce((s,p) => s + (Number(p.price)||0), 0)
}

function aplicarDescontos(total){
  const est = document.querySelector('#estudante')?.checked
  const cupao = document.querySelector('#cupao')?.value.trim().toLowerCase()
  let d = 0
  if (est) d += .25
  if (cupao === 'black-friday') d += .15
  if (d > 0) return Math.max(0, total * (1 - d))
  return total
}

function atualizarCheckout(){
  const bruto = totalBruto()
  const final = aplicarDescontos(bruto)
  const sem = document.querySelector('#total-sem-desc')
  const com = document.querySelector('#total-com-desc')
  if (sem) sem.value = `${bruto.toFixed(2)} €`
  if (com) com.value = `${final.toFixed(2)} €`
}

function atualizarCesto(){
  const sec = document.querySelector('#cesto')
  sec.querySelectorAll('article').forEach(a => a.remove())

  const lista = obterCesto()
  let total = 0
  lista.forEach((prod, i) => {
    total += Number(prod.price) || 0
    sec.insertBefore(criarProdutoCesto(prod, i), document.querySelector('#checkout'))
  })

  document.querySelector('#total-cesto').textContent = `Custo total: ${total.toFixed(2)} €`
  document.querySelector('#total-sem-desc').value = `${total.toFixed(2)} €`
  document.querySelector('#total-com-desc').value = `${aplicarDescontos(total).toFixed(2)} €`
  document.querySelector('#referencia').value = '—'
  document.querySelector('#erro-checkout').textContent = ''
}

function gerarReferencia(){
  const d = new Date()
  const yy = String(d.getFullYear()).slice(2)
  const mm = String(d.getMonth()+1).padStart(2,'0')
  const dd = String(d.getDate()).padStart(2,'0')
  const seq = String(Math.floor(Math.random()*10000)).padStart(4,'0')
  return `${yy}${mm}${dd}-${seq}`
}



async function checkout(){
  const lista = obterCesto()
  const estudante = document.querySelector('#estudante').checked
  const cupao = document.querySelector('#cupao').value.trim()
  const erro = document.querySelector('#erro-checkout')
  erro.textContent = ''

  const body = {
    items: lista.map(p => ({ id: p.id, qty: 1 })),
    student: estudante,
    coupon: cupao || null
  }

  try{
    const res = await fetch(`${API_BASE}/buy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await res.json()

    if (!res.ok){
      erro.textContent = data.message || 'Erro no checkout'
      return
    }

    const total = Number(data.total_with_discount ?? data.total ?? 0).toFixed(2)
    document.querySelector('#total-com-desc').value = `${total} €`
    document.querySelector('#referencia').value = data.payment_reference || '—'
  }catch(e){
    document.querySelector('#erro-checkout').textContent = 'Não foi possível concluir a compra'
  }
}

const products=[
{id:1,name:"Мини-лампа с сенсорным управлением",cat:"home",price:799,old:1290,discount:"−38%",rating:"4.9",reviews:1842,img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80"},
{id:2,name:"Беспроводные наушники Air Mini",cat:"gadgets",price:1490,old:2490,discount:"−40%",rating:"4.8",reviews:921,img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"},
{id:3,name:"Женская базовая сумка",cat:"accessories",price:1190,old:1990,discount:"−40%",rating:"4.7",reviews:763,img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80"},
{id:4,name:"Оверсайз худи Soft Touch",cat:"fashion",price:1690,old:2990,discount:"−43%",rating:"4.9",reviews:2301,img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80"},
{id:5,name:"Умные LED-часы",cat:"gadgets",price:2190,old:3890,discount:"−44%",rating:"4.6",reviews:438,img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"},
{id:6,name:"Органайзер для косметики",cat:"beauty",price:690,old:990,discount:"−30%",rating:"4.8",reviews:1104,img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80"},
{id:7,name:"Ночник-проектор звёздного неба",cat:"home",price:990,old:1590,discount:"−38%",rating:"4.9",reviews:2500,img:"https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=700&q=80"},
{id:8,name:"Рюкзак Urban Daily",cat:"accessories",price:1390,old:2290,discount:"−39%",rating:"4.8",reviews:652,img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80"},
{id:9,name:"Керамическая кружка",cat:"home",price:490,old:790,discount:"−38%",rating:"4.7",reviews:1887,img:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80"},
{id:10,name:"Солнцезащитные очки",cat:"accessories",price:890,old:1490,discount:"−40%",rating:"4.8",reviews:932,img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"}
];
let cart=[], liked=new Set();
const money=n=>new Intl.NumberFormat("ru-RU").format(n)+" ₽";
const grid=document.getElementById("products");

function render(list=products){
 grid.innerHTML=list.map(p=>`<article class="product">
 <div class="photo"><img src="${p.img}" alt="${p.name}" loading="lazy"><span class="discount">${p.discount}</span>
 <button class="heart ${liked.has(p.id)?"liked":""}" onclick="toggleLike(${p.id})">♥</button></div>
 <div class="info"><h3>${p.name}</h3><div class="rating">★ ${p.rating} <span class="reviews">(${p.reviews})</span></div>
 <div class="price"><span class="new-price">${money(p.price)}</span><span class="old-price">${money(p.old)}</span></div>
 <button class="add" onclick="addToCart(${p.id})">В корзину</button></div></article>`).join("");
}
function toggleLike(id){liked.has(id)?liked.delete(id):liked.add(id);render(filtered());}
function addToCart(id){const p=products.find(x=>x.id===id);const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({...p,qty:1});updateCart();openCart();}
function updateCart(){
 document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(p=>`<div class="cart-item"><img src="${p.img}"><div><h4>${p.name}</h4><p>${p.qty} × ${money(p.price)}</p></div></div>`).join(""):"<p style='color:#999'>Корзина пока пуста.</p>";
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0));
}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;

let filtered=()=>products;
document.getElementById("searchInput").addEventListener("input",e=>{
 const q=e.target.value.toLowerCase().trim();
 filtered=()=>products.filter(p=>p.name.toLowerCase().includes(q));
 render(filtered());
});
document.querySelectorAll(".sort-btn").forEach(btn=>btn.onclick=()=>{
 document.querySelectorAll(".sort-btn").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
 const list=filtered();
 if(btn.dataset.sort==="price")list.sort((a,b)=>a.price-b.price);
 render(list);
});
document.querySelectorAll(".categories a").forEach(a=>a.onclick=e=>{
 const id=a.getAttribute("href").slice(1);
 if(["fashion","home","beauty","gadgets","kids","accessories"].includes(id)){
   e.preventDefault();filtered=()=>products.filter(p=>p.cat===id);render(filtered());
 }
});
render();updateCart();
document.getElementById('mobileCartNav')?.addEventListener('click', e=>{e.preventDefault();openCart();});

import { db } from "./firebase.js";
import { products, loadProducts } from "./inventory.js";
import { doc, updateDoc, addDoc, collection, serverTimestamp }
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

let cart = [];
const cartTable = document.getElementById("cartTable");
const grand = document.getElementById("grandTotal");

document.getElementById("addCartBtn").onclick = () => {
  const p = products.find(x=>x.id===sellProduct.value);
  const qty = +sellQty.value;
  if(qty>p.stock) return alert("Not enough stock");

  cart.push({
    id:p.id,
    name:p.name,
    price:+sellPrice.value || p.price,
    qty
  });
  renderCart();
};

function renderCart(){
  cartTable.innerHTML="";
  let total=0;
  cart.forEach((i,idx)=>{
    const t=i.price*i.qty; total+=t;
    cartTable.innerHTML+=`
    <tr>
      <td>${i.name}</td><td>${i.price}</td><td>${i.qty}</td>
      <td>${t}</td><td><button onclick="remove(${idx})">X</button></td>
    </tr>`;
  });
  grand.innerText=total;
}
window.remove=i=>{cart.splice(i,1);renderCart()}

document.getElementById("confirmSaleBtn").onclick = async ()=>{
  for(const i of cart){
    const p = products.find(x=>x.id===i.id);
    await updateDoc(doc(db,"products",i.id),{stock:p.stock-i.qty});
  }
  await addDoc(collection(db,"sales"),{
    items:cart,
    total:+grand.innerText,
    date:serverTimestamp()
  });
  cart=[];renderCart();loadProducts();
};

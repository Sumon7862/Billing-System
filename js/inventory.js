import { db } from "./firebase.js";
import { collection, addDoc, getDocs } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

export let products = [];

const table = document.getElementById("productTable");
const sellSelect = document.getElementById("sellProduct");

document.getElementById("addProductBtn").onclick = async () => {
  await addDoc(collection(db,"products"),{
    name:pName.value,
    unit:pUnit.value,
    price:+pPrice.value,
    stock:+pStock.value
  });
  loadProducts();
};

export async function loadProducts(){
  products = [];
  table.innerHTML = "";
  sellSelect.innerHTML = "";
  const snap = await getDocs(collection(db,"products"));
  snap.forEach(d=>{
    const p = {id:d.id,...d.data()};
    products.push(p);
    table.innerHTML += `<tr><td>${p.name}</td><td>${p.unit}</td><td>${p.price}</td><td>${p.stock}</td></tr>`;
    sellSelect.innerHTML += `<option value="${p.id}">${p.name}</option>`;
  });
}
loadProducts();

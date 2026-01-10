import { db } from "./firebase.js";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const pName=document.getElementById("pName");
const pUnit=document.getElementById("pUnit");
const pPrice=document.getElementById("pPrice");
const pStock=document.getElementById("pStock");
const table=document.getElementById("productTable");
const sellSelect=document.getElementById("sellProduct");

export let products=[];

document.getElementById("addProductBtn").onclick=async()=>{
  if(!pName.value || !pPrice.value || !pStock.value) return alert("Fill all fields");
  await addDoc(collection(db,"products"),{
    name:pName.value, unit:pUnit.value, price:+pPrice.value, stock:+pStock.value
  });
  pName.value=pPrice.value=pStock.value="";
  loadProducts();
};

export async function loadProducts(){
  products=[]; table.innerHTML=""; sellSelect.innerHTML="";
  const snap=await getDocs(collection(db,"products"));
  snap.forEach(d=>{
    const p={id:d.id,...d.data()};
    products.push(p);
    table.innerHTML+=`<tr>
      <td>${p.name}</td><td>${p.unit}</td><td>${p.price}</td><td>${p.stock}</td>
      <td>
        <button onclick="editProduct('${p.id}')">Edit</button>
        <button onclick="deleteProduct('${p.id}')">Delete</button>
      </td>
    </tr>`;
    sellSelect.innerHTML+=`<option value="${p.id}">${p.name}</option>`;
  });
}

window.editProduct=async(id)=>{
  const p=products.find(x=>x.id===id);
  const newName=prompt("Product Name",p.name);
  const newPrice=prompt("Price",p.price);
  const newStock=prompt("Stock",p.stock);
  if(!newName||!newPrice||!newStock) return;
  await updateDoc(doc(db,"products",id),{name:newName,price:+newPrice,stock:+newStock});
  loadProducts();
};

window.deleteProduct=async(id)=>{
  if(confirm("Delete product?")){ await deleteDoc(doc(db,"products",id)); loadProducts();}
}

loadProducts();

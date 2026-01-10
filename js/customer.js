import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const customerTable=document.getElementById("customerTable");
const filterCustomer=document.getElementById("filterCustomer");

export async function loadCustomerInvoices(){
  customerTable.innerHTML="";
  const snap=await getDocs(collection(db,"sales"));
  snap.forEach(d=>{
    const s=d.data();
    customerTable.innerHTML+=`<tr>
      <td>${new Date(s.date.seconds*1000).toLocaleString()}</td>
      <td>${s.customer||''}</td>
      <td>${s.items.length}</td>
      <td>৳ ${s.total}</td>
    </tr>`;
  });
}

filterCustomer.addEventListener("input",async()=>{
  const search=filterCustomer.value.toLowerCase();
  customerTable.innerHTML="";
  const snap=await getDocs(collection(db,"sales"));
  snap.forEach(d=>{
    const s=d.data();
    if((s.customer||'').toLowerCase().includes(search)){
      customerTable.innerHTML+=`<tr>
        <td>${new Date(s.date.seconds*1000).toLocaleString()}</td>
        <td>${s.customer}</td>
        <td>${s.items.length}</td>
        <td>৳ ${s.total}</td>
      </tr>`;
    }
  });
});

loadCustomerInvoices();

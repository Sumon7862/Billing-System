import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const reportCards=document.getElementById("reportCards");
const salesTable=document.getElementById("salesTable");

export async function loadReports(){
  const snap=await getDocs(collection(db,"sales"));
  let today=new Date().toDateString();
  let todaySale=0,todayInvoices=0,totalSale=0;
  salesTable.innerHTML="";

  snap.forEach(d=>{
    const s=d.data();
    totalSale+=s.total;
    if(new Date(s.date.seconds*1000).toDateString()===today){
      todaySale+=s.total;
      todayInvoices++;
    }
    salesTable.innerHTML+=`<tr>
      <td>${new Date(s.date.seconds*1000).toLocaleString()}</td>
      <td>${s.items.length}</td>
      <td>৳ ${s.total}</td>
    </tr>`;
  });

  reportCards.innerHTML=`
    <div class="card">Today Sale<br>৳ ${todaySale}</div>
    <div class="card">Today Invoices<br>${todayInvoices}</div>
    <div class="card">Total Sale<br>৳ ${totalSale}</div>
  `;
}

loadReports();

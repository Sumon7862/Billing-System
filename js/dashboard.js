import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const dashboardCards=document.getElementById("dashboardCards");
const stockAnalytics=document.getElementById("stockAnalytics");

export async function loadDashboard(){
  const productsSnap=await getDocs(collection(db,"products"));
  let totalProducts=0,totalQty=0,totalValue=0;
  productsSnap.forEach(d=>{
    totalProducts++;
    totalQty+=d.data().stock;
    totalValue+=d.data().stock*d.data().price;
  });

  const salesSnap=await getDocs(collection(db,"sales"));
  let today=new Date().toDateString(),todaySale=0,todayInvoices=0,totalSale=0;
  salesSnap.forEach(d=>{
    const s=d.data();
    totalSale+=s.total;
    if(new Date(s.date.seconds*1000).toDateString()===today){
      todaySale+=s.total;
      todayInvoices++;
    }
  });

  dashboardCards.innerHTML=`
    <div class="card">Today Sale<br>৳ ${todaySale}</div>
    <div class="card">Today Invoices<br>${todayInvoices}</div>
    <div class="card">Total Sale<br>৳ ${totalSale}</div>
  `;

  stockAnalytics.innerHTML=`
    <div class="card">Total Products<br>${totalProducts}</div>
    <div class="card">Total Stock Quantity<br>${totalQty}</div>
    <div class="card">Stock Value<br>৳ ${totalValue}</div>
  `;
}

loadDashboard();

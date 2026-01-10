import { db } from "./firebase.js";
import { collection, getDocs }
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const today = new Date().toDateString();
let todaySale=0,todayInvoices=0,totalSale=0;

const snap = await getDocs(collection(db,"sales"));
snap.forEach(d=>{
  const s=d.data();
  totalSale+=s.total;
  if(new Date(s.date.seconds*1000).toDateString()===today){
    todaySale+=s.total;
    todayInvoices++;
  }
});

todaySaleElem.innerText=todaySale;
todayInvoicesElem.innerText=todayInvoices;
totalSaleElem.innerText=totalSale;

const todaySaleElem=document.getElementById("todaySale");
const todayInvoicesElem=document.getElementById("todayInvoices");
const totalSaleElem=document.getElementById("totalSale");

const pages=document.querySelectorAll(".page");
const menuItems=document.querySelectorAll("nav ul li");

menuItems.forEach(item=>{
  item.addEventListener("click",()=>{
    pages.forEach(p=>p.classList.remove("active"));
    document.getElementById(item.dataset.page).classList.add("active");
  });
});

// Show dashboard by default
document.getElementById("dashboard").classList.add("active");

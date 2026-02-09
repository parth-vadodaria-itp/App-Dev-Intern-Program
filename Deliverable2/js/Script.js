const navId=document.getElementById("nav-menu"),
ToggleBtnId=document.getElementById("toggle-btn"),
CloseBtnId=document.getElementById("close-btn");

ToggleBtnId.addEventListener("click", () => {
    navId.classList.add("show");
});

CloseBtnId.addEventListener("click", () => {
    navId.classList.remove("show");
})
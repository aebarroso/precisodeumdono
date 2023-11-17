function menuNav(menu) {
    console.log(String(menu).split("#")[1]);
    document.location.href = String(menu).split("#")[1]+".html";
}
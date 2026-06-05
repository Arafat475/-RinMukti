function toggleLanguage() {
  var isEnglish = document.body.classList.toggle("bangla-mode");
  var btn = document.getElementById("langToggle");
  if (isEnglish) {
    btn.textContent = "বাংলা";
    localStorage.setItem("lang", "bangla");
  } else {
    btn.textContent = "EN";
    localStorage.setItem("lang", "en");
  }
}

// Apply saved preference when page loads
window.onload = function() {
  if (localStorage.getItem("lang") === "bangla") {
    document.body.classList.add("bangla-mode");
    var btn = document.getElementById("langToggle");
    if (btn) btn.textContent = "বাংলা";
  }
};
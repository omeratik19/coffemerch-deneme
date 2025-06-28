window.addEventListener("DOMContentLoaded", function () {
  var loader = document.getElementById("page-loader");
  if (loader) {
    loader.addEventListener("animationend", function () {
      loader.classList.add("hide");
      // Sayfa içeriklerini göster
      document.body.classList.add("content-loaded");
    });
  }

  // Anasayfaya Dön Butonu Efekti
  var backHomeBtn = document.getElementById("backHomeBtn");
  var homeButtonEffect = document.getElementById("homeButtonEffect");

  if (backHomeBtn && homeButtonEffect) {
    backHomeBtn.addEventListener("click", function (e) {
      e.preventDefault();

      homeButtonEffect.style.display = "block";
      homeButtonEffect.style.animation = "greenBarUp 1.5s ease-in-out forwards";

      setTimeout(function () {
        window.location.href = "index.html";
      }, 1500);
    });
  }
});

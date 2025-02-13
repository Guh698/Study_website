document.addEventListener("DOMContentLoaded", function () {
  const nav_home = document.getElementById("nav_home");
  const home = document.querySelector(".home");
  const nav_subjects = document.getElementById("nav_subjects");
  const subjects = document.querySelector(".subjects");
  const boxes = document.querySelectorAll(".box");
  let loadedImages = 0;
  const navItems = document.querySelectorAll(".nav-item");
  const navIndicator = document.querySelector(".nav-indicator");
  const navContainer = document.querySelector(".navitems");

  function updateActiveTab(clickedItem) {
    // Remove "active" de todos os itens
    navItems.forEach((item) => item.classList.remove("active"));

    clickedItem.classList.add("active");

    const itemRect = clickedItem.getBoundingClientRect();
    const containerRect = navContainer.getBoundingClientRect(); // Pegamos o container de referência

    const offsetLeft = itemRect.left - containerRect.left;

    navIndicator.style.transform = `translateX(${offsetLeft}px)`;
    navIndicator.style.width = `${itemRect.width}px`; // Ajusta largura da barrinha
  }

  // Adicionando evento de clique a cada item
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      updateActiveTab(this);
    });
  });

  // Define a aba inicial ativa
  updateActiveTab(document.querySelector("#nav_home"));

  /*loading*/

  boxes.forEach((box) => {
    const imgDiv = box.querySelector("div");
    if (!imgDiv) return;

    const bgImage = window.getComputedStyle(imgDiv).backgroundImage;
    const url = bgImage.replace(/url\((['"])?(.*?)\1\)/gi, "$2");

    const img = new Image();
    img.src = url;
    img.onload = () => {
      loadedImages++;
      if (loadedImages === boxes.length) {
        setTimeout(() => {
          document.getElementById("preloader").style.display = "none";
        }, 3000);
      }
    };
  });

  /* home carregada */
  home.classList.add("show");

  if (nav_home && home) {
    /* add show */
    nav_home.addEventListener("click", function () {
      home.classList.add("show");
      nav_home.style.color = "9999f7";

      /* remove show */
      subjects.classList.remove("show");
    });
  }

  if (nav_subjects && subjects) {
    nav_subjects.addEventListener("click", function () {
      /* add show */
      subjects.classList.add("show");

      /* remove show */
      home.classList.remove("show");
    });
  }
});

"use strict";
let idOrder = new URL(window.location.href).searchParams.get("orderId");
/**
 * Afficher le numero de la commande récuperer dans l'URL
 */
const confirmWithNumberFinal = () => {
  orderId.innerText = localStorage.getItem("orderId");

  localStorage.clear();
};

confirmWithNumberFinal();

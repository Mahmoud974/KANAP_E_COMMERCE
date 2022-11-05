"use strict";
let data = [];
let productStorage;
/**
 * Selectionner les balises option & item__img via le querySelector
 */

const option = document.querySelector("option"),
  item_img = document.querySelector(".item__img");

/**
 * Récuperer l'URL, plus précisement l'id avec les variables suivantes
 */
let str = window.location.href,
  url = new URL(str),
  search_params = new URLSearchParams(url.search),
  productId = search_params.get("id");

/**
 * Obtenir les données de l'API
 */
const getData = async () => {
  await fetch(`http://localhost:3000/api/products/${productId}`)
    .then((data) => data.json())
    .then((res) => (data = res));
};
/**
 * Décrire l'API avec le produit qui a été selectionner,
 */
const setData = () => {
  document.title = `${data.name} | ${data.description}`;
  title.textContent = data.name;
  item_img.innerHTML = ` <img src=${data.imageUrl} alt=${data.altTxt}>`;
  price.textContent = data.price.toLocaleString();
  description.textContent = data.description;

  //Parcourir le tableau de couleur
  for (let colors of data.colors) {
    let createColors = document.createElement("option");
    document.querySelector("#colors").appendChild(createColors);
    createColors.value = colors;
    createColors.innerHTML = colors;
  }
};
/**
 * Ajouter une promesse
 */
const getDataDetails = async () => {
  await getData();
  setData();
};
getDataDetails();

//Ajouter le produit selectionner dans le localStorage plus précisement dans le panier
addToCart.addEventListener("click", () => {
  //Afficher la boite de dialogue lorsque celui n'est pas remplie
  if (colors.value == "" || quantity.value <= 0 || quantity.value > 100) {
    return alert(
      "Veuillez choisir une couleur ou une quantité entre 1 à 100! "
    );
  } else {
    //Choisir la quantité selon les conditions
    let optionsProduit = {
      _id: productId,
      colors: colors.value,
      quantity: Number(quantity.value),
    };

    productStorage = JSON.parse(localStorage.getItem("produit"));

    if (productStorage) {
      const findProduct = productStorage.find(
        (el) => el._id === productId && el.colors === colors.value
      );

      if (findProduct) {
        let newQuantite =
          parseInt(optionsProduit.quantity) + parseInt(findProduct.quantity);
        findProduct.quantity = newQuantite;
        localStorage.setItem("produit", JSON.stringify(productStorage));
      } else {
        productStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(productStorage));
      }
    } else {
      productStorage = [];
      productStorage.push(optionsProduit);
      localStorage.setItem("produit", JSON.stringify(productStorage));
    }
  }
  alert(
    `Le produit ${data.name.toUpperCase()} de couleur ${colors.value.toUpperCase()} avec une quantité de ${Number(
      quantity.value
    )} a été rajouté au panier !`
  );
});

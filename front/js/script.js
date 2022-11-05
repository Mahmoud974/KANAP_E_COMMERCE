"use strict";
let data = [];

/**
 * Obtenir les données de l'API
 */
const getData = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((res) => (data = res));
};
/**
 *Crée une fiche de produit avec des paramètres spécifiques
 * @param {String} link
 * @param {String} src
 * @param {String} altImg
 * @param {String} title
 * @param {String} paragraph
 */
const paramsArticles = (link, src, altImg, title, paragraph) => {
  //Créer des variables avec la methode createElement
  const createLink = document.createElement("a"),
    createArticle = document.createElement("article"),
    createImg = document.createElement("img"),
    createTitle = document.createElement("h3"),
    createParagraph = document.createElement("p");
  //Injecter les varibles au dessus dans la balise artice du DOM
  items.appendChild(createLink);
  createLink.appendChild(createArticle);
  createArticle.appendChild(createImg);
  createArticle.appendChild(createTitle);
  createArticle.appendChild(createParagraph);
  //Ajouter les attributs, classes & href, dans les balises crées
  createLink.setAttribute("href", link);
  createImg.setAttribute("src", src), createImg.setAttribute("altImg", altImg);
  createTitle.classList.add("productName"), (createTitle.textContent = title);
  createParagraph.classList.add("productDescription"),
    (createParagraph.textContent = paragraph);
  createParagraph.style.marginTop = "-12px";
  createParagraph.style.paddingBottom = "2px";
};

/**
 * Afficher les produits sur la page d'acceuil
 */
const getDisplay = async () => {
  await getData();
  data
    .map((product) => {
      let urlProduct = `http://127.0.0.1:5500/front/html/product.html?id=${product._id}`;
      //Initialiser les paramatres avec les donnés de l'API
      paramsArticles(
        urlProduct,
        product.imageUrl,
        product.altTxt,
        product.name,
        product.description
      );
    })
    .join(" ");
};
/**
 * Lancer la fonction getDisplay apres le chragement de la page
 */
window.addEventListener("load", getDisplay);

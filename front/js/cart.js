"use strict";
//Initialiser les variables
let data = [];
let index;
let newQty;
let getItemsInStorage;
let getInJson;

let productStorage = JSON.parse(localStorage.getItem("produit"));

/**
 * Obtenir les information du Id donnés sur l'API
 * @param {String} myId l'identifiant de l'API
 */
const getData = async (myId) => {
  await fetch(`http://localhost:3000/api/products/${myId}`)
    .then((res) => res.json())
    .then((res) => (data = res));
};

/**
 * Afficher les produits dans le DOM depuis les donnés récuperer via le localstorage
 */
const getProducts = async () => {
  getItemsInStorage = window.localStorage.getItem("produit");
  //Afficher panier vide lorsque le localstorage est vide
  if (getItemsInStorage === null || getItemsInStorage.length == 2) {
    cart__items.innerHTML = "<p>Panier vide</p>";
    totalQuantity.innerHTML = 0;
    totalPrice.innerHTML = 0;
  } else {
    //Afficher le produit selectionnerr
    for (let i = 0; i < JSON.parse(getItemsInStorage).length; i++) {
      getInJson = JSON.parse(getItemsInStorage)[i];
      await getData(getInJson._id);

      cart__items.innerHTML += ` <article class="cart__item"  data-id="${
        getInJson._id
      }" data-color=${getInJson.colors}>
                <div class="cart__item__img">
                  <img src=${String(
                    data.imageUrl
                  )} alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${String(data.name)}</h2>
                    <p>${getInJson.colors}</p>
                    <p id='prixXQuantity'>${Number(data.price)} € </p> 
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté :  </p>
                      <input index="${[
                        i,
                      ]}" type="number" onchange="modifyQuantity(this)" class="itemQuantity" name="itemQuantity"  min="0" max="100"   value="${
        productStorage[i].quantity
      }">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p index="${[
                        i,
                      ]}" onclick="deleteArticle(this)" class="deleteItem" 
                        >Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
    }

    {
      totalOfAmountTotal();

      totalPrice.innerHTML = totalOfAmountTotal();
      totalQuantity.innerHTML = totalOfItem();
    }
  }
};

/**
 * Afficher le prix total
 * @returns  Retourner le calcul faite par le nombre d'article x le prix
 */
const totalOfAmountTotal = () => {
  let totalprix = 0;
  for (let i = 0; i < JSON.parse(getItemsInStorage).length; i++) {
    totalprix = Number(totalOfItem()) * parseInt(data.price);
    let resultNumbers = totalprix;
    return resultNumbers;
  }
};

/**
 * Inititialiser la fonction avec les mêmes données pour pouvoir faire bénéficier la fonction deleteArticle et modifyQuantity
 */
const deleteProcess = (e) => {
  productStorage.splice(index, 1);
  localStorage.setItem("produit", JSON.stringify(productStorage));
  e.closest("article").remove();
  totalQuantity.innerHTML = totalOfItem();
  totalPrice.innerHTML = totalOfAmountTotal();
  if (
    productStorage.length == [] ||
    getItemsInStorage === null ||
    getItemsInStorage.length == 2
  ) {
    cart__items.innerHTML = "<p>Panier vide</p>";
    totalQuantity.innerHTML = totalOfItem();
    totalPrice.innerHTML = totalOfAmountTotal();
  }
};
/**
 * Supprimer un article du DOM & du localstorage
 * @param {*} e
 */
const deleteArticle = async (e) => {
  index = e.getAttribute("index");
  if (confirm("Voulez-vous supprimer?")) {
    deleteProcess(e);
  }
};
getProducts();

/**
 *Modifier la quantité sur l'input et le mettre à jour dans le localstorage et le DOM
 * @param {*} testNumber
 * @returns
 */
const modifyQuantity = (e) => {
  index = e.getAttribute("index");
  newQty = e.value;
  productStorage[index].quantity = newQty;

  if (newQty == 0) {
    deleteProcess(e);
  } else {
    localStorage.setItem("produit", JSON.stringify(productStorage));
  }
  totalQuantity.innerHTML = totalOfItem();
  totalPrice.innerHTML = totalOfAmountTotal();
};
/**
 *
 * @returns Afficher le total d'article
 */
const totalOfItem = () => {
  if (getItemsInStorage === null || localStorage.length == 0) {
    return null;
  } else {
    const totalQuantity = productStorage
      .map((total) => Number(total.quantity))
      .reduce((a, b) => a + b, 0);

    return totalQuantity;
  }
};

//Vérifier le formulaires avec les REGEX
const cart__order__form = document.querySelector("form");
const inputs = document.querySelectorAll(
  ' input[type="text"], input[type="email"]'
);

let firstName, lastname, adress, city, mail;
/**
 * Afficher un message d'alerte lorsque celui-ci n'est pas remplie
 * @param {*} tag
 * @param {*} message
 * @param {*} valid
 */
const errorDisplay = (tag, message, valid) => {
  const selectId = document.querySelector(`#${tag}`);

  if (!valid) {
    selectId.textContent = message;
  } else {
    selectId.textContent = message;
  }
};
/**
 *Vérifier la correspondance du prénom
 * @param {String} value
 */
const checkFirstName = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay(
      "firstNameErrorMsg",
      "Le prénom doit faire entre 3 et 20 caractères"
    );
    firstName = null;
  } else if (!value.match(/^[a-zA-Z.-]*$/)) {
    errorDisplay(
      "firstNameErrorMsg",
      "Le prénom ne doit pas contenir de(s) nombre(s) ou de caractère spéciaux"
    );
    firstName = null;
  } else {
    errorDisplay("firstNameErrorMsg", "", "");
    firstName = value;
  }
};
/**
 *Vérifier la correspondance du nom
 * @param {String} value
 */
const checkLastName = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay(
      "lastNameErrorMsg",
      "Le nom doit faire entre 3 et 20 caractères"
    );
    lastname = null;
  } else if (!value.match(/^[a-zA-Z.-]*$/)) {
    errorDisplay(
      "lastNameErrorMsg",
      "Le nom ne doit ne doit pas contenir de(s) nombre(s) ou de caractères spéciaux"
    );
    lastname = null;
  } else {
    errorDisplay("lastNameErrorMsg", "", "");
    lastname = value;
  }
};
/**
 *Vérifier la correspondance de l'adresse
 * @param {String} value
 */
const checkAdress = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay(
      "addressErrorMsg",
      "L'adresse doit faire entre 3 et 20 caractères"
    );
    adress = null;
  } else if (
    !value.match(/^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/)
  ) {
    errorDisplay(
      "addressErrorMsg",
      "Format d'adresse invalide (Ex: 45 rue Victor Hugo)"
    );
    adress = null;
  } else {
    errorDisplay("addressErrorMsg", "", "");
    adress = value;
  }
};

/**
 *Vérifier la correspondance de la ville
 * @param {String} value
 */
const checkCity = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay(
      "cityErrorMsg",
      "Dans le champ ville, ne doit pas contenir de nombre !"
    );
    city = null;
  } else if (!value.match(/^[a-zA-Z.-]*$/)) {
    //Alert of mistakes
    errorDisplay(
      "cityErrorMsg",
      "La ville ne doit ne doit pas contenir de(s) nombre(s) ou de caractères spéciaux"
    );
    city = null;
  } else {
    errorDisplay("cityErrorMsg", "", "");
    city = value;
  }
};
/**
 *Vérifier la correspondance du mail
 * @param {String} value
 */
const checkMail = (value) => {
  if (
    !value.match(
      /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i
    )
  ) {
    errorDisplay("emailErrorMsg", "Le mail n'est pas valide");
    mail = null;
  } else {
    errorDisplay("emailErrorMsg", "", true);
    mail = value;
  }
};
/**
 * Faire remplir les inputs correctements
 */
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        checkFirstName(e.target.value);
        break;
      case "lastName":
        checkLastName(e.target.value);
        break;
      case "address":
        checkAdress(e.target.value);
        break;
      case "city":
        checkCity(e.target.value);
        break;
      case "email":
        checkMail(e.target.value);
        break;

      default:
        null;
    }
  });
});

/**
 * Envoyer le formulaire dans la page confirmation, losquer celui remplie toute les conditions
 */
order.addEventListener("click", (e) => {
  e.preventDefault();
  const thisValue = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  if (
    thisValue.firstName == "" ||
    thisValue.lastName == "" ||
    thisValue.adress == "" ||
    thisValue.city == "" ||
    thisValue.email == ""
  ) {
    alert("Remplir les inputs corrrectement ! ");
  } else if (
    localStorage.length == 0 ||
    productStorage.length == "" ||
    getItemsInStorage === null ||
    getItemsInStorage.length == 2
  ) {
    alert("Panier vide, veuillez selectionner un ou des produits ! ");
  } else if (
    firstName == null ||
    lastname == null ||
    mail == null ||
    city == null ||
    adress == null
  ) {
    alert(
      "Erreur sur un ou des input(s): La soumission du formulaire se fera, lorsque toute les conditions seront remplies !"
    );
  } else {
    let idProducts = [];
    for (let i = 0; i < productStorage.length; i++) {
      idProducts.push(productStorage[i]._id);
    }
    //Initialiser l'objet
    const checkForm = {
      contact: {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      },
      products: idProducts,
    };
    //Poster le formulaire lorsque celui rermplie toute les conditons
    const options = {
      method: "POST",
      body: JSON.stringify(checkForm),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((res) => res.json())
      .then((data) => {
        localStorage.clear();
        localStorage.setItem("orderId", data.orderId);

        document.location.href = "confirmation.html?id=" + data.orderId;
      })

      .catch(function (err) {
        alert("erreur");
      });
  }
});

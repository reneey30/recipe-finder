const ENDPOINT = "https://api.spoonacular.com/recipes/";
const RECIPES_COUNT = 3;
const API_KEY = "e74950d89dbe4c6a9349da28a66873bd";


const joiner = ",+"

let ingredients = [];

// appending ingredients to unordered list
function addIngredient(userIngredient) {
    let ul = document.getElementById("ingredient-list");
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    li.appendChild(document.createTextNode(userIngredient));
    ul.appendChild(li);
  }

// getting list of ingredients
function getIngredients(){
    let listOfIngredients = document.getElementById("ingredient-list").getElementsByTagName("li");
    
    for (let item of listOfIngredients) {
        console.log(item.innerText);
        ingredients.push(item.innerText);
        console.log(ingredients)
    }
    console.log(ingredients)


    let recipeID = 716429;

    let query1 = `${ENDPOINT}findByIngredients`; 
    let query2 = `${ENDPOINT}${recipeID}/information`;

    // let ingredients = ["apples", "flour", "sugar"];
    // let ingredients = [];
    let allIngredients = ingredients.join(joiner);

    console.log(allIngredients);


    // let ingredientString = ingredients[0] + joiner + ingredients[1] + joiner + ingredients[2] + "&number=" + RECIPES_COUNT;

    let ingredientString = allIngredients + "&number=" + RECIPES_COUNT;

    let ingredientQuery = `${query1}?ingredients=${ingredientString}&apiKey=${API_KEY}`;

    // let ingredientQuery = `${query2}?includeNutrition=false&apiKey=${API_KEY}`;

    console.log(ingredientQuery);

    fetch(ingredientQuery)
    .then(res => res.json())
    .then(data => console.log(data))


    // un hide container b
    let containerB = document.getElementById("container-b");
    containerB.classList.remove("d-none");

    // hide container a
    let containerA = document.getElementById("container-a");
    containerA.classList.add("d-none");


    }
//   let x = document.getElementById("user-ingredient").value;


// button 1
const buttonAddIngredient = document.getElementById("add-ingredient");

buttonAddIngredient.onclick = function() {addIngredient(document.getElementById("user-ingredient").value)};


// button 2
const buttonGetRecipe = document.getElementById("get-recipes");

buttonGetRecipe.onclick = function() {getIngredients()};


  

// let recipeID = 716429;

// let query1 = `${ENDPOINT}findByIngredients`; 
// let query2 = `${ENDPOINT}${recipeID}/information`;

// // let ingredients = ["apples", "flour", "sugar"];
// // let ingredients = [];
// let allIngredients = ingredients.join(joiner);

// console.log(allIngredients);


// // let ingredientString = ingredients[0] + joiner + ingredients[1] + joiner + ingredients[2] + "&number=" + RECIPES_COUNT;

// let ingredientString = allIngredients + "&number=" + RECIPES_COUNT;

// let ingredientQuery = `${query1}?ingredients=${ingredientString}&apiKey=${API_KEY}`;

// // let ingredientQuery = `${query2}?includeNutrition=false&apiKey=${API_KEY}`;

// console.log(ingredientQuery);

// fetch(ingredientQuery)
// .then(res => res.json())
// .then(data => console.log(data))




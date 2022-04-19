const ENDPOINT = "https://api.spoonacular.com/recipes/";
const RECIPES_COUNT = 3;
const API_KEY = "e74950d89dbe4c6a9349da28a66873bd";


const joiner = ",+"

let recipeID = 716429;

let query1 = `${ENDPOINT}findByIngredients`; 
let query2 = `${ENDPOINT}${recipeID}/information`;

let ingredients = ["apples", "flour", "sugar"];
let ingredientString = ingredients[0] + joiner + ingredients[1] + joiner + ingredients[2] + "&number=" + RECIPES_COUNT;

let ingredientQuery = `${query1}?ingredients=${ingredientString}&apiKey=${API_KEY}`;

// let ingredientQuery = `${query2}?includeNutrition=false&apiKey=${API_KEY}`;

console.log(ingredientQuery);

fetch(ingredientQuery)
.then(res => res.json())
.then(data => console.log(data))




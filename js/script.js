const ENDPOINT = "https://api.spoonacular.com/recipes/";
const RECIPES_COUNT = 3;
const API_KEY = "e74950d89dbe4c6a9349da28a66873bd";

const joiner = ",+"

let recipes = [];

let ingredients = [];

// function addList(innerText, classOfUl) {
//     let ul = document.getElementById(classOfUl);
//     let li = document.createElement("li");
//     li.classList.add("list-group-item");
//     li.appendChild(document.createTextNode(innerText));
//     ul.appendChild(li);
//   }
function addList(innerText, ul) {
    // let ul = document.getElementById(classOfUl);
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    li.appendChild(document.createTextNode(innerText));
    ul.appendChild(li);
  }


// appending ingredients to unordered list
function addIngredient(userIngredient) {
    let ul = document.getElementById("ingredient-list");
    console.log(ul);
    let li = document.createElement("li");
    console.log(li);
    li.classList.add("list-group-item");
    li.appendChild(document.createTextNode(userIngredient));
    ul.appendChild(li);
    console.log(li);
  }

// getting list of ingredients
function getIngredients(){
    let listOfIngredients = document.getElementById("ingredient-list").getElementsByTagName("li");
    
    for (let item of listOfIngredients) {
        
        ingredients.push(item.innerText);
        
    }
    console.log(ingredients)
    
    return ingredients;
    }

    
function getRecipes () {

    ingredients = getIngredients();
        // let recipeID = 716429;

    let query1 = `${ENDPOINT}findByIngredients`; 
    // let query2 = `${ENDPOINT}${recipeID}/information`;

    let allIngredients = ingredients.join(joiner);

    console.log(allIngredients);

    let ingredientString = allIngredients + "&number=" + RECIPES_COUNT;

    let ingredientQuery = `${query1}?ingredients=${ingredientString}&apiKey=${API_KEY}`;

    // let ingredientQuery = `${query2}?includeNutrition=false&apiKey=${API_KEY}`;

    console.log(ingredientQuery);

    fetch(ingredientQuery)
    .then(res => res.json())
    .then(recipes => {
        // work with data returned from API in this block
        console.log(recipes);
        //cards container
        let cards = document.getElementById("cards-container").getElementsByClassName("recipe");
        // console.log(cards);
        let i = 0;

        for (let recipe of recipes){
            // working on each individual recipe
            // title: recipe.title
            // image: recipe.image
            // ingredients: 1. ingredients not requested(missing) recipe.missedIngredients - loop thru => recipe.missedIngredients[n].name
            //ingredients: 2. ingredients requested(in request by user) recipe.usedIngredients - loop thru => recipe.usedIngredients[n].name
            //instructions: todo
            console.log(recipe);

            console.log(cards[i].getElementsByClassName("card-title")[0].innerText);
            console.log(cards[i].getElementsByClassName("card-img-top")[0].currentScr);
            console.log(cards[i].getElementsByClassName("list-group")[0]);

            let listContainer = cards[i].getElementsByClassName("list-group")[0];

            // loop one - add ingredients not requested to ul
            for (let missedIngredient of recipe.missedIngredients) {

                // let apiIngredient = missedIngredient.name;

                addList(missedIngredient.name, listContainer);
            }

            // loop two - add ingredients requested to ul

            for (let usedIngredient of recipe.usedIngredients) {

                // let apiIngredient = missedIngredient.name;

                addList(usedIngredient.name, listContainer);
            }

            cards[i].getElementsByClassName("card-title")[0].innerText = recipe.title;
            cards[i].getElementsByClassName("card-img-top")[0].src = recipe.image;
            

            i++;
            
        }
    })  

    // un hide container b
    let containerB = document.getElementById("container-b");
    containerB.classList.remove("d-none");

    // hide container a
    let containerA = document.getElementById("container-a");
    containerA.classList.add("d-none");

    // clearing all ingredients listed 
    let ul = document.getElementById("ingredient-list");
    ul.innerHTML = "";

}
    

function startOver() {

    // un hide container a
    let containerA = document.getElementById("container-a");
    containerA.classList.remove("d-none");

    // hide container b
    let containerB = document.getElementById("container-b");
    containerB.classList.add("d-none");

    //clear cards
    let cards = document.getElementById("cards-container").getElementsByClassName("recipe");

    for (let card of cards){
        let listContainer = card.getElementsByClassName("list-group")[0];
        listContainer.innerHTML = "";
    }
    

}
//   let x = document.getElementById("user-ingredient").value;


// button 1
const buttonAddIngredient = document.getElementById("add-ingredient");

buttonAddIngredient.onclick = function() {
    let userInput = document.getElementById("user-ingredient").value;
    let ul = document.getElementById("ingredient-list");
    addList(userInput, ul);
    // addIngredient(userInput);
    document.getElementById("user-ingredient").value = "";
};


// button 2
const buttonGetRecipe = document.getElementById("get-recipes");

buttonGetRecipe.onclick = function() {getRecipes()};

// button 3 (technically button 4, button 3 is shelved for now)

const buttonStartOver = document.getElementById("start-over");

buttonStartOver.onclick = function() {startOver()};

  

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




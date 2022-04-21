const ENDPOINT = "https://api.spoonacular.com/recipes/";
const RECIPES_COUNT = 3;
// const API_KEY = "e74950d89dbe4c6a9349da28a66873bd";
const API_KEY = "9dcdb30197a14d4c973b4501f5bb3c7d";

const joiner = ",+"

let ingredients = [];
let recipeIds = [];

// function to like a recipe
function likeRecipe (){
    
}

function addList(inputValue, ul) {
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    // li.appendChild(document.createTextNode(inputValue));
    li.innerHTML = inputValue;
    ul.appendChild(li);
  }


// getting list of ingredients
function getIngredients(){
    let listOfIngredients = document.getElementById("ingredient-list").getElementsByTagName("li");
    list = [];
    
    for (let item of listOfIngredients) {
        
        list.push(item.innerText);
        
    }
    
    return list;
    }

    
function getRecipes () {

    ingredients = getIngredients();
    

    let query1 = `${ENDPOINT}findByIngredients`; 
    // let query2 = `${ENDPOINT}${recipeID}/information`;

    let allIngredients = ingredients.join(joiner);

    // console.log(allIngredients);

    let ingredientString = allIngredients + "&number=" + RECIPES_COUNT;

    let ingredientQuery = `${query1}?ingredients=${ingredientString}&apiKey=${API_KEY}`;

    // let ingredientQuery = `${query2}?includeNutrition=false&apiKey=${API_KEY}`;

    console.log(ingredientQuery);

    // fetch recipes
    fetch(ingredientQuery)
    .then(res => res.json())
    .then(recipes => {
        // work with data returned from API in this block
        console.log(recipes);
        //cards container
        let cards = document.getElementById("cards-container").getElementsByClassName("recipe");
        // console.log(cards);
        let i = 0;

        let tempRecipesId = []

        for (let recipe of recipes){
            // working on each individual recipe card

            tempRecipesId.push(recipe.id);
            
            // title: recipe.title
            // image: recipe.image
            // ingredients: 1. ingredients not requested(missing) recipe.missedIngredients - loop thru => recipe.missedIngredients[n].name
            //ingredients: 2. ingredients requested(in request by user) recipe.usedIngredients - loop thru => recipe.usedIngredients[n].name
            //instructions: recipe.id will be used to get {RecipeID} to use in query 2
            // 

            // console.log(recipe);

            // console.log(cards[i].getElementsByClassName("card-title")[0].innerText);
            // console.log(cards[i].getElementsByClassName("card-img-top")[0].currentScr);
            // console.log(cards[i].getElementsByClassName("list-group")[0]);

            cards[i].getElementsByClassName("card-title")[0].innerText = recipe.title;
            cards[i].getElementsByClassName("card-img-top")[0].src = recipe.image;

            let listContainer = cards[i].getElementsByClassName("list-group")[0];

            // loop one - add ingredients requested to ul
 
            for (let usedIngredient of recipe.usedIngredients) {

                addList("<strong>" + usedIngredient.name + "</strong>", listContainer);
            }           

            // loop two - add ingredients not requested to ul

            for (let missedIngredient of recipe.missedIngredients) {

                addList(missedIngredient.name, listContainer);
            }

            // get recipe id from recipe results json - recipe.id
            
            // console.log(`${ENDPOINT}${recipe.id}/information`);

            // instructionButton = cards[i].getElementsByClassName("instructions")[0];

            // console.log("before: ");
            // console.log(instructionButton);

            //second fetch for getting recipe steps/instructions
            // fetch(`${ENDPOINT}${recipe.id}/information?apiKey=${API_KEY}`)
            // .then(res => res.json())
            // .then(steps => {
            //     // appending instructions url to instructions button
            // // cards[i].getElementsByClassName("instructions")[0].href = steps.spoonacularUrl;
            // // console.log(cards[i].getElementsByClassName("instructions")[0]);
            // // console.log(steps.sourceUrl);

            // console.log("inside: ");
            // console.log(instructionButton);

            // instructionButton.href = steps.sourceUrl;
            
            
            // });

            
            // console.log("outside: ");
            // console.log(instructionButton);
            
            

            i++;     
        }

        recipeIds = tempRecipesId;
        console.log("recipes id inside fetch 1")
        console.log(recipeIds);
        return tempRecipesId;
    }).then(themIds => {
        console.log("recipes id outside");
        console.log(themIds);
        // let j = 0;
        // fetch instructions
        // recipeIds = [647524, 648729, 1697653]
        for (let j=0; j < themIds.length; j++) {

            fetch(`${ENDPOINT}${themIds[j]}/information?apiKey=${API_KEY}`)
            .then(res => res.json())
            .then(steps => {
            console.log(themIds[j]);
            console.log(steps);
                // appending instructions url to instructions button
            // cards[i].getElementsByClassName("instructions")[0].href = steps.spoonacularUrl;
            // console.log(cards[i].getElementsByClassName("instructions")[0]);
            // console.log(steps.sourceUrl);

            let cards = document.getElementById("cards-container").getElementsByClassName("recipe");

            
            cardLink = cards[j].getElementsByClassName("instructions")[0];
            
            console.log(cards[j].getElementsByClassName("card-title")[0].innerText);
            console.log("inside card: " + j);
            
            cardLink.href = steps.sourceUrl;
            console.log(steps.sourceUrl);
           
            });
        
        }
    });  

    // console.log("recipes id outside");
    // console.log(recipeIds);
    // let j = 0;
    // // fetch instructions
    // // recipeIds = [647524, 648729, 1697653]
    // for (let recipeId of recipeIds) {
    //     fetch(`${ENDPOINT}${recipeId}/information?apiKey=${API_KEY}`)
    //     .then(res => res.json())
    //     .then(steps => {
    //         // appending instructions url to instructions button
    //     // cards[i].getElementsByClassName("instructions")[0].href = steps.spoonacularUrl;
    //     // console.log(cards[i].getElementsByClassName("instructions")[0]);
    //     // console.log(steps.sourceUrl);

    //     let cards = document.getElementById("cards-container").getElementsByClassName("recipe");

         
    //     cardLink = cards[j].getElementsByClassName("instructions")[0];
        
    //     console.log("inside: ");
    //     console.log(cardLink);
    //     cardLink.href = steps.sourceUrl;
        
        
    //     j++;
    //     });
    // }
   

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
        // clear title
        card.getElementsByClassName("card-title")[0].innerText = "Recipe Title";
        // clear image url
        card.getElementsByClassName("card-img-top")[0].src = "https://spoonacular.com/recipeImages/716429-556x370.jpg";

        // clear list of ingredients
        let listContainer = card.getElementsByClassName("list-group")[0];
        listContainer.innerHTML = "";

        ingredients = [];
        recipeIds = [];
    }
    

}


// button 1
const buttonAddIngredient = document.getElementById("add-ingredient");

buttonAddIngredient.onclick = function() {
    let userInput = document.getElementById("user-ingredient").value;
    let ul = document.getElementById("ingredient-list");
    addList(userInput, ul);
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




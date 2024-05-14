// ------Importing the database-------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// -------Setting up the database---------
const appSettings = {
    databaseURL: "https://blog-3dbab-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const blogDb = ref(database, "blogs")

// -------Fetching the Elements------
const input = document.querySelector("textarea")
const btn = document.querySelector("button")
const ul = document.querySelector("ul")


// ------Adding a blog to the database and HTML------
btn.addEventListener("click", function() {
    let inputValue = input.value
    push(blogDb, inputValue)

    appendingLiItems()
    clearInput()
})

// -------Fetching the database values-------
onValue(blogDb, function(snapshot) {
let objectToArray = Object.entries(snapshot.val())

clearAllBlogItems()

for (let i = 0; i < objectToArray.length; i++) {
let displayItems = objectToArray[i]

appendingLiItems(displayItems)
}
})


// ------Functions------
function appendingLiItems(itemAdded) {
let itemId = itemAdded[0]
let itemValue = itemAdded[1]

  ul.innerHTML += `<div class="liEl-contanier"> <li>${itemValue}</li> <img class="cross" src="assests/letter-x.png" alt=""></div>`


const cross = document.getElementsByClassName("cross")

for (let i = 0; i < cross.length; i++) {

cross[i].addEventListener("click", function() {
    
let pathToDatabase = ref(database, `blogs/${itemId}`)
remove(pathToDatabase)
console.log("removed")

})
}
}


function clearInput() {
    input.value = ""
}

function clearAllBlogItems() {
    ul.innerHTML = ""
}
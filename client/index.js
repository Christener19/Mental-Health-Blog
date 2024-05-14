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

    
clearInput()
})

// -------Fetching the database values-------
onValue(blogDb, function(snapshot) {
if (snapshot.exists()) {

let objectToArray = Object.entries(snapshot.val())

clearAllBlogItems()

for (let i = 0; i < objectToArray.length; i++) {
    let currentItem = objectToArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

appendingLiItems(currentItem)
}

} else {
    ul.innerHTML = "No positive affirmations."
}
})


// ------Functions------
//-------Appending list items------
function appendingLiItems(itemAdded) {
    let itemId = itemAdded[0]
let itemValue = itemAdded[1]


// Creating new elements 
let liElContainer = document.createElement("div")
liElContainer.classList.add("liEl-contanier")

let li = document.createElement("li")
li.textContent = itemValue

let image = document.createElement("img")
image.classList.add("cross")
image.src = "assests/letter-x.png"
image.alt = "White cross on gray background."

liElContainer.appendChild(li)
liElContainer.appendChild(image)

ul.appendChild(liElContainer)

// ------Removing a blog entry-------
image.addEventListener("click", function() {
    let pathToDatabase = ref(database, `blogs/${itemId}`);
    remove(pathToDatabase);

})
} 


// ------Clearing input------
function clearInput() {
    input.value = ""
}

// -----Clearing all blog items before loading page-----
function clearAllBlogItems() {
    ul.innerHTML = ""
}
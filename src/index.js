let addToy = false;
let collectionDiv = document.querySelector("#toy-collection")
let likeBtn = document.createElement('button')

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      const toyForm = document.querySelector('.add-toy-form')
      
      toyForm.addEventListener('submit', (e) => {
      e.preventDefault()
      postToy(e.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => 
      toys.forEach(toy => renderToy(toy))
  )}

function renderToy(toy) {
    let divCard = document.createElement('div')
    divCard.className = "card"
    let imgDiv = document.createElement('div')
    collectionDiv.appendChild(divCard)
    imgDiv.className = 'toy-avatar'
   
    divCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src='${toy.image}' class=toy-avatar>
    <p>${toy.likes} Likes </p>
    `
    let likeBtn = document.createElement('button')
    likeBtn.setAttribute('class', 'like-btn')
    likeBtn.setAttribute('data-id', `${toy.id}`)
    divCard.append(likeBtn)
    likeBtn.innerHTML = 'Like <3'
    likeBtn.addEventListener('click', likeToy)
}
    
    
function likeToy(e) {
  console.log(e.target.dataset.id)
  let moreLikes = parseInt(e.target.previousElementSibling.innerText) 
  moreLikes += 1 
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": `${moreLikes}`
    })
  })
  .then(resp => resp.json())
  .then(likeObj => {
    e.target.previousElementSibling.innerText = `${moreLikes} likes`
  })
}


function postToy(toyData) {
  debugger
  let formData = {
    "name": toyData.name.value,
    "image": toyData.image.value,
    "likes": 0
  }
  let configObj = { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formData)
  }
  fetch("http://localhost:3000/toys", configObj)
  .then(resp => resp.json())
  .then(toy_obj => renderToy(toy_obj)
  )
}

const socket = io();

function sendChat(){

const input = document.getElementById("chatInput")

socket.emit("chat message",input.value)

input.value=""

}

socket.on("chat message",(msg)=>{

const box = document.getElementById("chatMessages")

box.innerHTML += `<p>${msg}</p>`

})

socket.on("chat message",(data)=>{
box.innerHTML += `<p><b>${data.user}:</b> ${data.message}</p>`
})

io.on("connection",(socket)=>{

console.log("User connected")

socket.on("like",(designId)=>{

io.emit("notification","Someone liked a design ❤️")

})

})

socket.on("notification",(msg)=>{

const notify = document.createElement("div")

notify.className = "notification"

notify.innerText = msg

document.body.appendChild(notify)

setTimeout(()=>{
notify.remove()
},4000)

})


// Smooth scroll

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault();

const target = document.querySelector(this.getAttribute("href"))
if(target){
target.scrollIntoView({behavior:"smooth"});
}
});

});


// Portfolio image popup

const images = document.querySelectorAll(".portfolio-img");

images.forEach(img => {

img.addEventListener("click", () => {

const popup = document.createElement("div");

popup.style.position = "fixed";
popup.style.top = 0;
popup.style.left = 0;
popup.style.width = "100%";
popup.style.height = "100%";
popup.style.background = "rgba(0,0,0,.9)";
popup.style.display = "flex";
popup.style.justifyContent = "center";
popup.style.alignItems = "center";

const imgTag = document.createElement("img");

imgTag.src = img.src;
imgTag.style.maxWidth = "80%";

popup.appendChild(imgTag);

popup.addEventListener("click", ()=>{

popup.remove();

});

document.body.appendChild(popup);

});

});



socket.on("chat message", function(msg){

const chat = document.getElementById("chat")

chat.innerHTML += `<p>${msg}</p>`
})


async function loadDesigns(){

const res = await fetch("/api/designs")
const designs = await res.json()

const grid = document.querySelector(".portfolio-grid")

grid.innerHTML = ""

designs.forEach(design=>{

grid.innerHTML += `
<img src="/uploads/${design.image}" 
class="portfolio-img"
onclick="doubleTapLike('${design._id}'); showHeart(event.pageX,event.pageY)">
`

})

}

loadDesigns()


function showHeart(x,y){

const heart = document.createElement("div")

heart.innerHTML = "❤️"
heart.classList.add("heart")

heart.style.left = x + "px"
heart.style.top = y + "px"

document.body.appendChild(heart)

setTimeout(()=>{
heart.remove()
},600)

}


const heroTitle = document.querySelector(".hero h1")

const text = heroTitle.innerText

heroTitle.innerText = ""

let i = 0

function type(){

if(i < text.length){
heroTitle.innerText += text.charAt(i)
i++
setTimeout(type,40)
}

}

type()


const cards = document.querySelectorAll(".portfolio-grid")

cards.forEach(grid=>{

grid.addEventListener("mousemove",(e)=>{

const rect = grid.getBoundingClientRect()

const x = e.clientX - rect.left
const y = e.clientY - rect.top

const centerX = rect.width / 2
const centerY = rect.height / 2

const rotateX = (y - centerY) / 10
const rotateY = (centerX - x) / 10

grid.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`

})

grid.addEventListener("mouseleave",()=>{
grid.style.transform = "rotateX(0) rotateY(0) scale(1)"
})

})

async function loadTrending(){

const res = await fetch("/api/designs/trending")
const designs = await res.json()

const container = document.getElementById("trending")

container.innerHTML = ""

designs.forEach(design=>{

container.innerHTML += `
<img src="/uploads/${design.image}" class="portfolio-img">
`

})

}

loadTrending()



document.addEventListener("DOMContentLoaded", () => {

  // MENU TOGGLE
  const menuBtn = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");

  if(menuBtn){
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // THEME TOGGLE
  const themeBtn = document.getElementById("themeToggle");

  if(themeBtn){

    // Load saved theme
    if(localStorage.getItem("theme") === "light"){
      document.body.classList.add("light-mode");
    }

    themeBtn.addEventListener("click", () => {

      document.body.classList.toggle("light-mode");

      if(document.body.classList.contains("light-mode")){
        localStorage.setItem("theme","light");
      }else{
        localStorage.setItem("theme","dark");
      }

    });

  }

});


if("serviceWorker" in navigator){
navigator.serviceWorker.register("/sw.js")
}

async function likeDesign(id){

const res = await fetch(`/api/designs/${id}/like`,{
method:"POST"
})

const data = await res.json()

document.getElementById("likes-"+id).innerText = data.likes

}


function toggleComments(id){

const box = document.getElementById("comments-"+id)

if(box.style.display === "none"){
box.style.display = "block"
}else{
box.style.display = "none"
}

}


async function sendComment(id){

const input = document.getElementById("input-"+id)

const text = input.value

await fetch(`/api/designs/${id}/comment`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({text})
})

input.value=""

loadDesigns()

}


async function saveDesign(id){

await fetch("/api/designs/"+id+"/favorite",{
method:"POST"
})

alert("Saved to favorites ⭐")

}

function followDesigner(){
alert("You are now following Donny Designs 🔥")
}

async function generateLogo(){

const prompt = document.getElementById("logoPrompt").value
const result = document.getElementById("logoResult")

result.innerHTML = "Generating AI design..."

const res = await fetch("/api/ai/generate-logo",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({prompt})
})

const data = await res.json()

result.innerHTML = `
<img src="${data.image}" style="max-width:400px;border-radius:10px;">
`
}

document.getElementById("orderForm").addEventListener("submit", async(e)=>{

  window.open(
"https://wa.me/2348105089569?text=Hello%20I%20just%20placed%20a%20design%20order",
"_blank"
)

e.preventDefault()

const formData = new FormData(e.target)

await fetch("/api/orders",{

method:"POST",
body:formData

})

alert("Order sent successfully!")

})

if("serviceWorker" in navigator){

navigator.serviceWorker.register("/sw.js")

}


// Portfolio Loader
async function loadDesigns(){

const res = await fetch("/api/designs")
const designs = await res.json()

const grid = document.querySelector(".portfolio-grid")

grid.innerHTML = ""

designs.forEach(design=>{

grid.innerHTML += `
<div class="design-card">

${design.likes > 20 ? '<span class="trending">🔥 Trending</span>' : ''}

<img src="/uploads/${design.image}" 
class="portfolio-img"
ondblclick="likeDesign('${design._id}')">

<div class="design-actions">

<button onclick="likeDesign('${design._id}')">
❤️ <span id="likes-${design._id}">${design.likes}</span>
</button>

<button onclick="saveDesign('${design._id}')">⭐️ Save</button>

<button onclick="toggleComments('${design._id}')">
💬 ${design.comments.length}
</button>

</div>

<div class="comments" id="comments-${design._id}" style="display:none">

<div class="comment-list">
${design.comments.map(c => `<p>${c.text}</p>`).join("")}
</div>

<input type="text" id="input-${design._id}" placeholder="Write a comment">

<button onclick="sendComment('${design._id}')">Send</button>

</div>

</div>
`

})

}

loadDesigns()
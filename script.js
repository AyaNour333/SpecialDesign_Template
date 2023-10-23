// check if there is local storage color option
let mainColor = localStorage.getItem("color_option")
if(mainColor !== null){
    document.documentElement.style.setProperty('--main-color',mainColor)
    document.querySelectorAll(".colors-list li").forEach(el=>{
        el.classList.remove("active")
        if(el.dataset.color == mainColor){
            el.classList.add("active")
        }
    })
}

let landingPage = document.querySelector(".landing-page")
let imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"]
let backgroundOption = true
let backgroundInterval

// check if local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option")
if(backgroundLocalItem !== null){
    if(backgroundLocalItem == 'true'){
        backgroundOption = true
    }else{
        backgroundOption = false
    }
    document.querySelectorAll(".random-background span").forEach((span)=>{
        span.classList.remove("active")
    })
    if(backgroundLocalItem == 'true'){
        document.querySelector(".random-background .yes").classList.add("active")
    }else{
        document.querySelector(".random-background .no").classList.add("active")
    }
}

function randomizeImgs(){
    if(backgroundOption == true){
        backgroundInterval = setInterval(() => {
    let randomImage = Math.floor(Math.random() * imgsArray.length)
    landingPage.style.backgroundImage = `url("./imgs/${imgsArray[randomImage]}")`
    }, 2000);
    }
}
randomizeImgs()

document.querySelector(".toggle-setting .icon").onclick = function(){
    this.classList.toggle("fa-spin")
    document.querySelector(".settings-box").classList.toggle("open")
}


// switch colors
let colorList = document.querySelectorAll(".colors-list li")
colorList.forEach((li)=>{
    li.addEventListener("click",(e)=>{
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color)
        window.localStorage.setItem('color_option',e.target.dataset.color)
        handleActive(e)
    })
})


// switch background
let randomBackEl = document.querySelectorAll(".random-background span")
randomBackEl.forEach((span)=>{
    span.addEventListener("click",(e)=>{
        handleActive(e)
        if(e.target.dataset.background == 'yes'){
            backgroundOption = true
            randomizeImgs()
            localStorage.setItem("background_option",true)
        }else{
            backgroundOption = false
            clearInterval(backgroundInterval)
            localStorage.setItem("background_option",false)
        }
    })
})

// fill skill span
let spans = document.querySelectorAll(".skill-box .skill-progress span")
let skills = document.querySelector(".skills")
window.onscroll = function(){
    let skillsOuterHeight = skills.offsetHeight
    let windowHeight = this.innerHeight
    if(window.scrollY > (skills.offsetTop + skillsOuterHeight - windowHeight)){
        spans.forEach((el)=>{
            el.style.width = el.dataset.width
        })
        // console.log(skills.offsetTop);
    }
}



let gallery = document.querySelectorAll(".gallery img")

gallery.forEach((img)=>{
    img.addEventListener("click",(e)=>{
        let overlay = document.createElement("div")
        overlay.className = "popup-overlay"
        document.body.appendChild(overlay)
        let popBox = document.createElement("div")
        popBox.className = "popup-box"
        if(img.alt !== null){
            let imgHead = document.createElement("h3")
            imgHead.appendChild(document.createTextNode(img.alt))
            popBox.appendChild(imgHead)
        }
        let popImage = document.createElement("img")
        popImage.src = img.src
        popBox.appendChild(popImage)
        document.body.appendChild(popBox)
        let closeButton = document.createElement("span")
        closeButton.appendChild(document.createTextNode('x'))
        closeButton.className = 'close-button'
        popBox.appendChild(closeButton)
    })
})
document.addEventListener('click',function(e){
    if(e.target.classList.contains("close-button")) {
        e.target.parentNode.remove()
        document.querySelector('.popup-overlay').remove()
    }
    // or
    if(e.target.classList.contains("popup-overlay")) {
        e.target.remove()
        document.querySelector('.popup-box').remove()
    }
})



let allBullets = document.querySelectorAll(".nav-bullets .bullet")
allBullets.forEach((bullet)=>{
    bullet.addEventListener("click",(e)=>{
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        })
    })
})


function handleActive(e){
    e.target.parentElement.querySelectorAll(".active").forEach(el=>{
        el.classList.remove("active")
    })
    e.target.classList.add("active")
}

let bulletsContainer = document.querySelector(".nav-bullets")
let bulletSpan = document.querySelectorAll(".bullets-option span")
let bulletLocalItem = localStorage.getItem('bullets_option')

if(bulletLocalItem !== null){
    bulletSpan.forEach((span)=>{
        span.classList.remove("active")
    })
    if(bulletLocalItem == 'block'){
        bulletsContainer.style.display = 'block'
        document.querySelector(".bullets-option .yes").classList.add("active")
    }else{
        bulletsContainer.style.display = 'none'
        document.querySelector(".bullets-option .no").classList.add("active")
    }
}
bulletSpan.forEach((span)=>{
    span.addEventListener("click",(e)=>{
        if(span.dataset.display == 'show'){
            bulletsContainer.style.display = 'block'
            localStorage.setItem("bullets_option",'block')
        }else{
            bulletsContainer.style.display = 'none'
            localStorage.setItem("bullets_option",'none')
        }
        handleActive(e)
    })
})



let resetButton = document.querySelector(".reset-options")
resetButton.onclick = function(){
    // localStorage.remove("bullets_option")
    // localStorage.remove("color_option")
    // localStorage.remove("background_option")
    localStorage.clear()
    window.location.reload()
}


let toggleMenu = document.querySelector(".toggle-menu")
let menu = document.querySelector(".links")

toggleMenu.onclick = function(e){
    e.stopPropagation()
    this.classList.toggle("menu-active")
    menu.classList.toggle("open")
}
menu.onclick = function(e){
    e.stopPropagation()
}
document.addEventListener('click',(e)=>{
    if(e.target !== toggleMenu && e.target !== menu){
        if(menu.classList.contains('open')){
            toggleMenu.classList.toggle("menu-active")
            menu.classList.toggle("open")
        }
        
    }
})
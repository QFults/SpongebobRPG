class Character {
  constructor(name, strength, defense) {
    this.name = name;
    this.hp = 50;
    this.strength = strength;
    this.defense = defense;
    this.avatar = `./assets/images/${this.name.toLowerCase()}.png`
  }
}

const characters = [
  new Character("Spongebob", 25, 10),
  new Character("Patrick", 20, 15),
  new Character("Squidward", 23, 12),
  new Character("Sandy", 27, 8)
]

let selectedChar = {}
let selectedOp = {}

const renderCharacters = () => {
  characters.forEach(({ name, hp, strength, defense, avatar }, i) => {
    let charElem = document.createElement("div")
    charElem.className = "col-md-3 fullHeight"
    charElem.innerHTML = `
        <div class="card mx-auto centerCard" style="width: 18rem;">
          <img src="${avatar}" class="card-img-top" alt="${name}">
          <div class="card-body d-flex justify-content-center flex-column">
            <h5 class="card-title text-center">${name}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary text-center">HP: ${hp}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary text-center">Strength: ${strength}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary text-center">Defense: ${defense}</h6>
            <button class="charChoice btn btn-primary" data-index="${i}">Select Character</button>
          </div>
        </div>
`
    document.getElementById("charDisp").append(charElem)
  })
}

const winMatch = () => {
  document.getElementById("resultDisp").innerHTML = `
    <h3 id="scroll-text">${selectedChar.name} has vanquished the mighty ${selectedOp.name}! Well done! Refresh to play again!</h3>
  `
}

const loseMatch = () => {
  document.getElementById("resultDisp").innerHTML = `
    <h3 id="scroll-text">${selectedChar.name} has fallen to the might of ${selectedOp.name}! Better luck next time! Refresh to play again!</h3>
  `
}

const renderVideo = () => {
  document.getElementById("charDisp").innerHTML = ""
  let videoDiv = document.createElement("div")
  videoDiv.innerHTML = `
  <iframe width="560" height="315" src="https://www.youtube.com/embed/oLRM6pkhL74?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  `
  document.getElementById("charDisp").append(videoDiv)
}

const checkEnd = () => {
  if (selectedChar.hp <= 0) {
    renderVideo()
    winMatch()
  } else if (selectedOp.hp <= 0) {
    renderVideo()
    loseMatch()
  }
}

const charAttack = () => {
  const points = (Math.round(Math.random() * selectedChar.strength)) - (Math.round(Math.random() * selectedOp.defense))
  if (points > 0) {
    selectedOp.hp -= points
    document.getElementById("opHpDisp").textContent = `HP: ${selectedOp.hp}`
    document.getElementById("turnResult").textContent = `${selectedChar.name} attacked ${selectedOp.name} for ${points}hp!`
  } else {
    document.getElementById("turnResult").textContent = `${selectedChar.name} attacked but it completely missed!`
  }

  checkEnd()
}

const opAttack = () => {
  const points = (Math.round(Math.random() * selectedOp.strength)) - (Math.round(Math.random() * selectedChar.defense))
  if (points > 0) {
    selectedChar.hp -= points
    document.getElementById("charHpDisp").textContent = `HP: ${selectedChar.hp}`
    document.getElementById("turnResult").textContent = `${selectedOp.name} attacked ${selectedChar.name} for ${points}hp!`
  } else {
    document.getElementById("turnResult").textContent = `${selectedOp.name} attacked but it completely missed!`
  }

  checkEnd()
}

const renderBattlefield = (message) => {
  document.getElementById("charDisp").innerHTML = ""
  let charElem = document.createElement("div")
  charElem.className = "col-md-4 fullHeight"
  charElem.innerHTML = `
        <div id="charCard" class="card mx-auto centerCard" style="width: 18rem;">
          <img src="${selectedChar.avatar}" class="card-img-top" alt="${selectedChar.name}">
          <div class="card-body d-flex justify-content-center flex-column">
            <h5 class="card-title text-center">${selectedChar.name}</h5>
            <h6 id="charHpDisp" class="card-subtitle mb-2 text-body-secondary text-center">HP: ${selectedChar.hp}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary text-center">Strength: ${selectedChar.strength}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary text-center">Defense: ${selectedChar.defense}</h6>
            <button id="charAttack" class="btn btn-success">Attack</button>            
          </div>
        </div>
`
  document.getElementById("charDisp").append(charElem)

  let btlElem = document.createElement("div")
  btlElem.className = "col-md-4 fullHeight"
  btlElem.innerHTML = `
        <div class="card mx-auto centerCard" style="width: 18rem;">
          <img src="./assets/images/karen.png" class="card-img-top" alt="Karen">
          <div class="card-body d-flex justify-content-center flex-column">
            <h5 class="card-title text-center"><b>Ready... Fight!</b></h5>
            <br>
            <br>
            <h3 id="turnResult" class="card-subtitle mb-2 text-body-secondary text-center">${message}</h3>           
          </div>
        </div>
`
  document.getElementById("charDisp").append(btlElem)

  let opElem = document.createElement("div")
  opElem.className = "col-md-4 fullHeight"
  opElem.innerHTML = `
        <div id="opCard" class="card mx-auto centerCard" style="width: 18rem;">
          <img src="${selectedOp.avatar}" class="card-img-top" alt="${selectedOp.name}">
          <div class="card-body d-flex justify-content-center flex-column">
            <h5 class="card-title text-center">${selectedOp.name}</h5>
            <h6 id="opHpDisp" class="card-subtitle mb-2 text-body-secondary text-center">HP: ${selectedOp.hp}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary text-center">Strength: ${selectedOp.strength}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary text-center">Defense: ${selectedOp.defense}</h6>           
          </div>
        </div>
`
  document.getElementById("charDisp").append(opElem)
}

document.addEventListener("click", event => {
  if (event.target.classList.contains("charChoice")) {
    selectedChar = characters[parseInt(event.target.dataset.index)]
    event.target.className = "btn btn-secondary"
    event.target.textContent = "Selected!"
    event.target.disabled = true

    Array.from(document.getElementsByClassName("charChoice btn btn-primary")).forEach(opBtn => {
      opBtn.className = "opChoice btn btn-danger"
      opBtn.textContent = "Select Opponent"
    });

  }
})

document.addEventListener("click", event => {
  if (event.target.classList.contains("opChoice")) {
    selectedOp = characters[parseInt(event.target.dataset.index)]
    renderBattlefield("")
  }
})

document.addEventListener("click", event => {
  if (event.target.id === "charAttack") {
    charAttack()
    console.log(event.target)
    event.target.textContent = "Wait..."
    event.target.className = "btn btn-secondary"
    event.target.disabled = true
    setTimeout(() => {
      opAttack()
      event.target.textContent = "Attack"
      event.target.className = "btn btn-success"
      event.target.disabled = false
    }, 3000);
  }
})

renderCharacters()


// damage = strength range (p1) - defense range (p2)
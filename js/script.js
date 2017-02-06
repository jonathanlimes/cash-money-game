function cashMoneyGame () {
  // append canvas to HTML
  var canvas = document.querySelector('canvas')
  var ctx = canvas.getContext('2d')
  canvas.width = 640
  canvas.height = 576
  canvas.lBound = 32
  canvas.rBound = canvas.width - 64
  canvas.tBound = 32
  canvas.bBound = canvas.height - 64
  var leftDiv = document.querySelector('#left')
  leftDiv.appendChild(canvas)

  // assign sound files
  var bgMusic = new Audio('sounds/bgMusic.mp3')
  var explosion = new Audio('sounds/explosion.wav')
  var powerup = new Audio('sounds/orange.wav')
  var money = new Audio('sounds/angpow.wav')

  // assign image files
  var isBackgroundReady = false
  var backgroundImg = new Image()
  backgroundImg.onload = function () {
    isBackgroundReady = true
  }
  backgroundImg.src = 'images/mapFinal.png'

  var isPlayerReady = false
  var playerImg = new Image()
  playerImg.onload = function () {
    isPlayerReady = true
  }
  playerImg.src = 'images/p1.png'

  var isPlayerTwoReady = false
  var playerTwoImg = new Image()
  playerTwoImg.onload = function () {
    isPlayerTwoReady = true
  }
  playerTwoImg.src = 'images/p2.png'

  var isAngpowReady = false
  var angpowImg = new Image()
  angpowImg.onload = function () {
    isAngpowReady = true
  }
  angpowImg.src = 'images/angpow.png'

  var isOrangeReady = false
  var orangeImg = new Image()
  orangeImg.onload = function () {
    isOrangeReady = true
  }
  orangeImg.src = 'images/orange.png'

  var isFirecrackerReady = false
  var firecrackerImg = new Image()
  firecrackerImg.onload = function () {
    isFirecrackerReady = true
  }
  firecrackerImg.src = 'images/firecrackerBig.png'

  // set vars for game objs
  var playerOne = {
    speed: 410, // px per sec
    x: 32,
    y: 32
  }
  var playerTwo = {
    speed: 410,
    x: canvas.width - 32,
    y: canvas.height - 32
  }
  var orange = {
    x: 0,
    y: 0
  }
  var firecracker = {
    x: 0,
    y: 0
  }
  var angpow = {
    x: 0,
    y: 0
  }

  // set vars for money counters
  var moneyP1 = 0
  var moneyP2 = 0

  // vars for timers, 'then', banner, keysDown
  var timerBar = $('#timer-bar')
  var max = timerBar.attr('max')
  var value = timerBar.val()
  var time = (1000 / max) * 30
  var runTimer = setInterval(function () { timer() }, time)
  var then = Date.now()
  var banner = document.querySelector('#banner')
  var keysDown = {}

  // set keydown/keyup functions
  window.addEventListener('keydown', function (e) {
    keysDown[e.keyCode] = true
  }, false)

  window.addEventListener('keyup', function (e) {
    delete keysDown[e.keyCode]
  }, false)

  // functions to respawn game objects
  function respawnOrange () {
    orange.x = 32 + (Math.random() * (canvas.width - 96))
    orange.y = 32 + (Math.random() * (canvas.height - 96))
  }
  function respawnFirecracker () {
    firecracker.x = 100 + (Math.random() * 400)
    firecracker.y = 100 + (Math.random() * 400)
  }
  function respawnAngpow () {
    angpow.x = 32 + (Math.random() * (canvas.width - 96))
    angpow.y = 32 + (Math.random() * (canvas.height - 96))
  }

  // function to upgate game objects upon event action
  function updateGameObjs (modifier) {
    // for movement of players
    if (87 in keysDown) {
      playerOne.y -= playerOne.speed * modifier
    }
    if (83 in keysDown) {
      playerOne.y += playerOne.speed * modifier
    }
    if (65 in keysDown) {
      playerOne.x -= playerOne.speed * modifier
    }
    if (68 in keysDown) {
      playerOne.x += playerOne.speed * modifier
    }
    if (38 in keysDown) {
      playerTwo.y -= playerTwo.speed * modifier
    }
    if (40 in keysDown) {
      playerTwo.y += playerTwo.speed * modifier
    }
    if (37 in keysDown) {
      playerTwo.x -= playerTwo.speed * modifier
    }
    if (39 in keysDown) {
      playerTwo.x += playerTwo.speed * modifier
    }

    // to stop movement beyond game boundaries
    if (playerOne.x < canvas.lBound) {
      playerOne.x = canvas.lBound
    }
    if (playerOne.x > canvas.rBound) {
      playerOne.x = canvas.rBound
    }
    if (playerOne.y < canvas.tBound) {
      playerOne.y = canvas.tBound
    }
    if (playerOne.y > canvas.bBound) {
      playerOne.y = canvas.bBound
    }
    if (playerTwo.x < canvas.lBound) {
      playerTwo.x = canvas.lBound
    }
    if (playerTwo.x > canvas.rBound) {
      playerTwo.x = canvas.rBound
    }
    if (playerTwo.y < canvas.tBound) {
      playerTwo.y = canvas.tBound
    }
    if (playerTwo.y > canvas.bBound) {
      playerTwo.y = canvas.bBound
    }

    // collision events
    if (
      playerOne.x <= (angpow.x + 32)
      && angpow.x <= (playerOne.x + 32)
      && playerOne.y <= (angpow.y + 32)
      && angpow.y <= (playerOne.y + 32)
    ) {
      $(money).get(0).play()
      moneyP1 += 2
      playerOne.speed -= 50
      respawnAngpow()
    }
    if (
      playerTwo.x <= (angpow.x + 32)
      && angpow.x <= (playerTwo.x + 32)
      && playerTwo.y <= (angpow.y + 32)
      && angpow.y <= (playerTwo.y + 32)
    ) {
      $(money).get(0).play()
      moneyP2 += 2
      playerTwo.speed -= 50
      respawnAngpow()
    }
    if (
      playerOne.x <= (orange.x + 32)
      && orange.x <= (playerOne.x + 32)
      && playerOne.y <= (orange.y + 32)
      && orange.y <= (playerOne.y + 32)
    ) {
      $(powerup).get(0).play()
      playerOne.speed += 100
      respawnOrange()
    }
    if (
      playerTwo.x <= (orange.x + 32)
      && orange.x <= (playerTwo.x + 32)
      && playerTwo.y <= (orange.y + 32)
      && orange.y <= (playerTwo.y + 32)
    ) {
      $(powerup).get(0).play()
      playerTwo.speed += 100
      respawnOrange()
    }
    if (
      playerOne.x <= (firecracker.x + 85)
      && firecracker.x <= (playerOne.x + 32)
      && playerOne.y <= (firecracker.y + 85)
      && firecracker.y <= (playerOne.y + 32)
    ) {
      playerOne.x = 32
      playerOne.y = 32
      $(explosion).get(0).play()
      if (moneyP1 >= 0) {
        moneyP1 -= 3
      }
      if (moneyP1 < 0) {
        moneyP1 = 0
      }
      respawnFirecracker()
    }
    if (
      playerTwo.x <= (firecracker.x + 85)
      && firecracker.x <= (playerTwo.x + 32)
      && playerTwo.y <= (firecracker.y + 85)
      && firecracker.y <= (playerTwo.y + 32)
    ) {
      playerTwo.x = canvas.width - 32
      playerTwo.y = canvas.height - 32
      $(explosion).get(0).play()
      if (moneyP2 >= 0) {
        moneyP2 -= 3
      }
      if (moneyP2 < 0) {
        moneyP2 = 0
      }
      respawnFirecracker()
    }
  }

  // function to render objects in the game area
  function renderObjs () {
    if (isBackgroundReady) {
      ctx.drawImage(backgroundImg, 0, 0)
    }
    if (isPlayerReady) {
      ctx.drawImage(playerImg, playerOne.x, playerOne.y)
    }
    if (isPlayerTwoReady) {
      ctx.drawImage(playerTwoImg, playerTwo.x, playerTwo.y)
    }
    if (isAngpowReady) {
      ctx.drawImage(angpowImg, angpow.x, angpow.y)
    }
    if (isOrangeReady) {
      ctx.drawImage(orangeImg, orange.x, orange.y)
    }
    if (isFirecrackerReady) {
      ctx.drawImage(firecrackerImg, firecracker.x, firecracker.y)
    }
    // render scoreboard onto the canvas
    ctx.fillStyle = 'orange'
    ctx.font = '22px Arial Black'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText('P1 SCORE: $' + moneyP1 + '              P2 SCORE: $' + moneyP2, canvas.width / 6, 0)
  }

  // change content of word banner when timer runs out
  function gameOver () {
    if (moneyP1 > moneyP2) {
      banner.textContent = 'P1 WINS WITH $' + moneyP1 + '!'
      $('#banner').css('font-size', '50px')
    } else if (moneyP2 > moneyP1) {
      banner.textContent = 'P2 WINS WITH $' + moneyP2 + '!'
      $('#banner').css('font-size', '50px')
    } else {
      banner.textContent = 'DRAW!'
      $('#banner').css('font-size', '100px')
    }
    $('canvas').remove()
    var coverBlock = document.createElement('div')
    coverBlock.style.width = '640px'
    coverBlock.style.height = '576px'
    coverBlock.style.backgroundImage = "url('images/mapFinal.png')"
    coverBlock.style.border = '4px solid #222222'
    coverBlock.style.display = 'inline-block'
    leftDiv.appendChild(coverBlock)
  }

  // run timer
  function timer () {
    value += 1
    addValue = timerBar.val(value)
    if (value == max) {
      console.log('timer has run out')
      clearInterval(runTimer)
      gameOver()
    }
  }

  // give functionality to reset button
  var resetButton = document.querySelector('button')
  resetButton.addEventListener('click', function () {
    location.reload()
  })

  // main function to initiate and loop the whole game
  function loopGame () {
    $(bgMusic).get(0).play()
    var now = Date.now()
    var changeInTime = now - then
    updateGameObjs(changeInTime / 1000) // param becomes the modifier
    renderObjs()
    then = now
    requestAnimationFrame(loopGame)
  }

  // polyfill for cross-browser compatibility
  requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame

  // run all functions
  respawnAngpow()
  respawnOrange()
  respawnFirecracker()
  loopGame()

  return {
    timer: timer,
    respawnOrange: respawnOrange,
    respawnFirecracker: respawnFirecracker,
    respawnAngpow: respawnAngpow,
    updateGameObjs: updateGameObjs,
    renderObjs: renderObjs,
    gameOver: gameOver,
    loopGame: loopGame
  }
}

window.addEventListener('DOMContentLoaded', function () {
  cashMoneyGame()
})

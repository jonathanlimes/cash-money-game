function cashMoneyGame () {
  // append canvas to HTML
  var canvas = document.querySelector('canvas')
  var ctx = canvas.getContext('2d')
  canvas.width = 640
  canvas.height = 640
  canvas.lBound = 32
  canvas.rBound = 640 - 64
  canvas.tBound = 32
  canvas.bBound = 640 - 64
  document.body.appendChild(canvas)

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
  backgroundImg.src = 'images/map.png'

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

  // game objs
  var player = {
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

  // set vars and functions for timer bar
  var timerBar = $('#timer-bar'),
    max = timerBar.attr('max'),
    value = timerBar.val(),
    time = (1000 / max) * 30

  function timer () {
    value += 1
    addValue = timerBar.val(value)
    if (value == max) {
      console.log('timer has run out')
      clearInterval(runTimer)
      gameOver()
    }
  }

  var runTimer = setInterval(function () {
    timer()
  }, time)

  // declare keysDown object and set keydown/keyup functions
  var keysDown = {}
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
      player.y -= player.speed * modifier
    }
    if (83 in keysDown) {
      player.y += player.speed * modifier
    }
    if (65 in keysDown) {
      player.x -= player.speed * modifier
    }
    if (68 in keysDown) {
      player.x += player.speed * modifier
    }
    // move within bounds
    if (player.x < canvas.lBound) {
      player.x = canvas.lBound
    }
    if (player.x > canvas.rBound) {
      player.x = canvas.rBound
    }
    if (player.y < canvas.tBound) {
      player.y = canvas.tBound
    }
    if (player.y > canvas.bBound) {
      player.y = canvas.bBound
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

    // to prevent players from moving beyond game area borders
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

    // collisions with sprite items
    if (
      player.x <= (angpow.x + 32)
      && angpow.x <= (player.x + 32)
      && player.y <= (angpow.y + 32)
      && angpow.y <= (player.y + 32)
    ) {
      $(money).get(0).play()
      moneyP1 += 2
      player.speed -= 50
      respawnAngpow()
    } else if (
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
      player.x <= (orange.x + 32)
      && orange.x <= (player.x + 32)
      && player.y <= (orange.y + 32)
      && orange.y <= (player.y + 32)
    ) {
      $(powerup).get(0).play()
      player.speed += 100
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
      player.x <= (firecracker.x + 85)
      && firecracker.x <= (player.x + 32)
      && player.y <= (firecracker.y + 85)
      && firecracker.y <= (player.y + 32)
    ) {
      player.x = 32
      player.y = 32
      $(explosion).get(0).play()
      moneyP1 -= 3
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
      moneyP2 -= 3
      respawnFirecracker()
    }
  }

  // function to render objects in the game area
  function renderObjs () {
    if (isBackgroundReady) {
      ctx.drawImage(backgroundImg, 0, 0)
    }
    if (isPlayerReady) {
      ctx.drawImage(playerImg, player.x, player.y)
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
  var banner = document.querySelector('#banner')
  function gameOver () {
    if (moneyP1 > moneyP2) {
      banner.textContent = 'P1 WINS WITH $' + moneyP1 + '!'
      alert('Player 1 wins!')
    } else if (moneyP2 > moneyP1) {
      banner.textContent = 'P2 WINS WITH $' + moneyP2 + '!'
      alert('Player 2 wins!')
    } else {
      banner.textContent = 'DRAW!'
      alert("Draw! Hit 'Reset Game' to play again!")
    }
  }

  // give functionality to reset button
  var resetButton = document.querySelector('button')
  resetButton.addEventListener('click', function () {
    location.reload()
    // angpowsP1 = 0
    // angpowsP2 = 0
    // player.x = (canvas.width/3)-32
    // player.y = canvas.height/2
    // playerTwo.x = (canvas.width/3)*2
    // playerTwo.y = canvas.height/2
    // banner.textContent = "CASH MONEY"
    // timerBar.reset()
  })

  // main function to initiate and loop the whole game
  function loopGame () {
    $(bgMusic).get(0).play()
    var now = Date.now()
    var changeInTime = now - then
    updateGameObjs(changeInTime / 1000)
    renderObjs()
    then = now
    requestAnimationFrame(loopGame)
  }

  // polyfill for cross-browser compatibility
  requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame

  // run all functions
  var then = Date.now()
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

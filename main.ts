 scene.setBackgroundImage(BattleshipImages.Background.TITLE_SCREEN)
game.waitAnyButton()
 scene.setBackgroundImage(BattleshipImages.Background.MAIN_SCREEN)

let playerCursor = sprites.create(BattleshipImages.MapItem.CURSOR)
playerCursor.setPosition(87, 11)
controller.up.onEvent(ControllerButtonEvent.Pressed, function() {
    if(playerCursor.y == 11) return
    playerCursor.y = playerCursor.y - 7
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function() {
    if(playerCursor.y == 74) return
    playerCursor.y = playerCursor.y + 7
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
    if(playerCursor.x == 150) return
    playerCursor.x = playerCursor.x + 7
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    if(playerCursor.x == 87) return
    playerCursor.x = playerCursor.x - 7
})

 let playerAttacksText = textsprite.create("PLAYER")
playerAttacksText.setMaxFontHeight(5)
playerAttacksText.setPosition(41, 86)
 let enemyAttacksText = textsprite.create("ENEMY")
enemyAttacksText.setMaxFontHeight(5)
enemyAttacksText.setPosition(119, 86)
let textVisible: boolean = true

let patrolBoat: Sprite = sprites.create(BattleshipImages.Ship.PATROL_BOAT)
let submarine: Sprite = sprites.create(BattleshipImages.Ship.SUBMARINE)
let cruiser: Sprite = sprites.create(BattleshipImages.Ship.CRUISER)
let battleSip: Sprite = sprites.create(BattleshipImages.Ship.BATTLESHIP)
let aircraftCarrier: Sprite = sprites.create(BattleshipImages.Ship.AIRCRAFT_CARRIER)
patrolBoat.setPosition(21, 11)
submarine.setPosition(24, 39)
cruiser.setPosition(24, 53)
battleSip.setPosition(28, 67)
aircraftCarrier.setPosition(31, 25)

let p_patrolBoat: Sprite = sprites.create(BattleshipImages.Ship.PATROL_BOAT)
let p_cruiser: Sprite = sprites.create(BattleshipImages.Ship.CRUISER)
let p_submarine: Sprite = sprites.create(BattleshipImages.Ship.SUBMARINE)
let p_battleSip: Sprite = sprites.create(BattleshipImages.Ship.BATTLESHIP)
let p_aircraftCarrier: Sprite = sprites.create(BattleshipImages.Ship.AIRCRAFT_CARRIER)
p_patrolBoat.setPosition(13, 97)
p_cruiser.setPosition(37, 97)
p_submarine.setPosition(65, 97)
p_battleSip.setPosition(20, 111)
p_aircraftCarrier.setPosition(58, 111)
let statusbar = statusbars.create(3, 4, 0)
statusbar.attachToSprite(p_patrolBoat)
let statusbar2 = statusbars.create(3, 6, 0)
statusbar2.attachToSprite(p_cruiser)
statusbar2.value = 70
let statusbar3 = statusbars.create(3, 6, 0)
statusbar3.attachToSprite(p_submarine)
statusbar3.value = 30
let statusbar4 = statusbars.create(3, 8, 0)
statusbar4.attachToSprite(p_battleSip)
statusbar4.value = 25
let statusbar5 = statusbars.create(3, 10, 0)
statusbar5.attachToSprite(p_aircraftCarrier)
statusbar5.value = 50


let e_patrolBoat: Sprite = sprites.create(BattleshipImages.Ship.PATROL_BOAT)
let e_cruiser: Sprite = sprites.create(BattleshipImages.Ship.CRUISER)
let e_submarine: Sprite = sprites.create(BattleshipImages.Ship.SUBMARINE)
let e_battleSip: Sprite = sprites.create(BattleshipImages.Ship.BATTLESHIP)
let e_aircraftCarrier: Sprite = sprites.create(BattleshipImages.Ship.AIRCRAFT_CARRIER)
e_patrolBoat.setPosition(96, 97)
e_cruiser.setPosition(120, 97)
e_submarine.setPosition(148, 97)
e_battleSip.setPosition(103, 111)
e_aircraftCarrier.setPosition(141, 111)
let statusbarE = statusbars.create(3, 4, 0)
statusbarE.attachToSprite(e_patrolBoat)
statusbarE.value = 50
let statusbarE2 = statusbars.create(3, 6, 0)
statusbarE2.attachToSprite(e_cruiser)
statusbarE2.value = 30
let statusbarE3 = statusbars.create(3, 6, 0)
statusbarE3.attachToSprite(e_submarine)
statusbarE3.value = 100
let statusbarE4 = statusbars.create(3, 8, 0)
statusbarE4.attachToSprite(e_battleSip)
statusbarE4.value = 25
let statusbarE5 = statusbars.create(3, 10, 0)
statusbarE5.attachToSprite(e_aircraftCarrier)
statusbarE5.value = 75

function drawImage(img: Image, x: number, y: number) {
    scene.backgroundImage().drawTransparentImage(img, x, y)
}

game.onUpdateInterval(1000, function() {
    playerAttacksText.setFlag(SpriteFlag.Invisible, textVisible)
    enemyAttacksText.setFlag(SpriteFlag.Invisible, textVisible)

    textVisible = textVisible ? false : true
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    let failed = sprites.create(BattleshipImages.MapItem.ATTACK_MISS)
    failed.setPosition(24, 18)
    failed.startEffect(effects.bubbles, 1000)
    failed.destroy()
    drawImage(BattleshipImages.MapItem.ATTACK_MISS, 21, 15)

    //submarine.setImage(BattleshipImages.Ship.SUBMARINE.rotated(180))
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function() {
    let sccess = sprites.create(BattleshipImages.MapItem.ATTACK_HIT)
    sccess.setPosition(136, 60)
    sccess.startEffect(effects.fire, 1000)
    sccess.destroy()
    drawImage(BattleshipImages.MapItem.ATTACK_HIT, 133, 57)

    //submarine.setImage(BattleshipImages.Ship.SUBMARINE)
})
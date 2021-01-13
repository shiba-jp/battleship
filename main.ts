 scene.setBackgroundImage(BattleshipImages.Background.TITLE_SCREEN)
game.waitAnyButton()
 scene.setBackgroundImage(BattleshipImages.Background.MAIN_SCREEN)

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
let p_submarine: Sprite = sprites.create(BattleshipImages.Ship.SUBMARINE)
let p_cruiser: Sprite = sprites.create(BattleshipImages.Ship.CRUISER)
let p_battleSip: Sprite = sprites.create(BattleshipImages.Ship.BATTLESHIP)
let p_aircraftCarrier: Sprite = sprites.create(BattleshipImages.Ship.AIRCRAFT_CARRIER)
p_patrolBoat.setPosition(15, 97)
p_submarine.setPosition(38, 97)
p_cruiser.setPosition(65, 97)
p_battleSip.setPosition(22, 111)
p_aircraftCarrier.setPosition(58, 111)

let e_patrolBoat: Sprite = sprites.create(BattleshipImages.Ship.PATROL_BOAT)
let e_submarine: Sprite = sprites.create(BattleshipImages.Ship.SUBMARINE)
let e_cruiser: Sprite = sprites.create(BattleshipImages.Ship.CRUISER)
let e_battleSip: Sprite = sprites.create(BattleshipImages.Ship.BATTLESHIP)
let e_aircraftCarrier: Sprite = sprites.create(BattleshipImages.Ship.AIRCRAFT_CARRIER)
e_patrolBoat.setPosition(97, 97)
e_submarine.setPosition(121, 97)
e_cruiser.setPosition(148, 97)
e_battleSip.setPosition(104, 111)
e_aircraftCarrier.setPosition(140, 111)

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
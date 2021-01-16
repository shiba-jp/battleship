/**
 * Title
 */
scene.setBackgroundImage((new BattleshipImages.Background()).TITLE_SCREEN)
game.waitAnyButton()
scene.setBackgroundImage((new BattleshipImages.Background()).MAIN_SCREEN)

/**
 * Prepare Ship Info
 */
prepareInformation()

/** 
 * Arrange Player Ships
*/
let playerShipMap: number[][] = [[],[]]
replaceShips(playerShipMap)

prepareCursor()

let playerAttacksText = textsprite.create("PLAYER")
    playerAttacksText.setMaxFontHeight(5)
    playerAttacksText.setPosition(41, 86)
    let enemyAttacksText = textsprite.create("ENEMY")
    enemyAttacksText.setMaxFontHeight(5)
    enemyAttacksText.setPosition(119, 86)
    let textVisible: boolean = true

game.onUpdateInterval(1000, function() {
    playerAttacksText.setFlag(SpriteFlag.Invisible, textVisible)
    enemyAttacksText.setFlag(SpriteFlag.Invisible, textVisible)

    textVisible = textVisible ? false : true
})


function drawImage(img: Image, x: number, y: number) {
    scene.backgroundImage().drawTransparentImage(img, x, y)
}


controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    /**
    let failed = sprites.create(BattleshipImages.MapItem.ATTACK_MISS)
    failed.setPosition(24, 18)
    failed.startEffect(effects.bubbles, 1000)
    failed.destroy()
    drawImage(BattleshipImages.MapItem.ATTACK_MISS, 21, 15)

    //submarine.setImage(BattleshipImages.Ship.SUBMARINE.rotated(180))
     */
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function() {
    /**
    let sccess = sprites.create(BattleshipImages.MapItem.ATTACK_HIT)
    sccess.setPosition(136, 60)
    sccess.startEffect(effects.fire, 1000)
    sccess.destroy()
    drawImage(BattleshipImages.MapItem.ATTACK_HIT, 133, 57)

    //submarine.setImage(BattleshipImages.Ship.SUBMARINE)
    */
})
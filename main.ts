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

let battleSip = sprites.create(BattleshipImages.Ship.BATTLE_SHIP)
battleSip.setPosition(21, 25)

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
    failed.setPosition(17, 18)
    failed.startEffect(effects.bubbles, 1000)
    failed.destroy()
    drawImage(BattleshipImages.MapItem.ATTACK_MISS, 14, 15)
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function() {
    let sccess = sprites.create(BattleshipImages.MapItem.ATTACK_HIT)
    sccess.setPosition(136, 60)
    sccess.startEffect(effects.fire, 1000)
    sccess.destroy()
    drawImage(BattleshipImages.MapItem.ATTACK_HIT, 133, 57)
})
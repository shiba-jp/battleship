 scene.setBackgroundImage(BattleshipImages.Background.TITLE_SCREEN)
game.waitAnyButton()
 scene.setBackgroundImage(BattleshipImages.Background.MAIN_SCREEN)

 let playerAttacksText = textsprite.create("PLAYER")
playerAttacksText.setMaxFontHeight(5)
playerAttacksText.setPosition(119, 86)
 let enemyAttacksText = textsprite.create("ENEMY")
enemyAttacksText.setMaxFontHeight(5)
enemyAttacksText.setPosition(41, 86)
let textVisible: boolean = true


game.onUpdateInterval(1000, function() {
    playerAttacksText.setFlag(SpriteFlag.Invisible, textVisible)
    enemyAttacksText.setFlag(SpriteFlag.Invisible, textVisible)

    textVisible = textVisible ? false : true
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    let failed = sprites.create(BattleshipImages.MapItem.ATTACK_FAILED)
    failed.setPosition(17, 18)
    failed.startEffect(effects.bubbles, 1000)
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function() {
    let sccess = sprites.create(BattleshipImages.MapItem.ATTACK_FAILED)
    sccess.setPosition(136, 60)
    sccess.startEffect(effects.fire, 1000)
})
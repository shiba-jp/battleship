controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    if(GameScene.PlayerTurn == currentScene) {
        let failed = sprites.create(BattleshipImages.MapItem.ATTACK_MISS)
        failed.setPosition(playerCursor.x, playerCursor.y)
        failed.startEffect(effects.bubbles, 1000)
        failed.destroy()
        utility.drawImage(BattleshipImages.MapItem.ATTACK_MISS, playerCursor.x - 3, playerCursor.y - 3)
    }
    

    //submarine.setImage(BattleshipImages.Ship.SUBMARINE.rotated(180))
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

enum GameScene {
    Title,
    DeployingShips,
    PlayerTurn,
    EnemyTurn,
}

let currentScene: GameScene = GameScene.Title
let backGround: BattleshipImages.Background = new BattleshipImages.Background()

/**
 * Title
 */
scene.setBackgroundImage(backGround.TITLE_SCREEN)
game.waitAnyButton()
scene.setBackgroundImage(backGround.MAIN_SCREEN)

/**
 * Prepare Ship Info
 */
prepareInformation()

/** 
 * Arrange Player Ships
*/
currentScene = GameScene.DeployingShips
let playerShipMap: number[][] = [[],[]]
let enemyShipMap: number[][] = [[],[]]
redeployPlayerShips(playerShipMap)
deployEnemyShips(enemyShipMap)

let playerCursor: Sprite = null
prepareCursor()
currentScene = GameScene.PlayerTurn

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








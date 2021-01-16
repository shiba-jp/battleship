enum GameScene {
    Title,
    DeployingShips,
    PlayerTurn,
    EnemyTurn,
}

music.setVolume(148)
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
let playerStatus: FleetStatus = new FleetStatus()
let enemyStatus: FleetStatus = new FleetStatus()
prepareInformation()

/** 
 * Arrange Player & Enemy Ships
*/
currentScene = GameScene.DeployingShips
let playerShipMap: number[][] = [[],[]]
let enemyShipMap: number[][] = [[],[]]
redeployPlayerShips(playerShipMap)
deployEnemyShips(enemyShipMap)


/**
 * Prepare Player Cursor
 */
let playerCursor: Sprite = null
let playerCurosrPosX: number = 0
let playerCurosrPosY: number = 0
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
    //enemyAttacksText.setFlag(SpriteFlag.Invisible, textVisible)

    textVisible = textVisible ? false : true
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    if(GameScene.PlayerTurn == currentScene) {
        let ship = enemyShipMap[playerCurosrPosX][playerCurosrPosY]
        if(ship == null) {
            let failed = sprites.create(BattleshipImages.MapItem.ATTACK_MISS)
            failed.setPosition(playerCursor.x, playerCursor.y)
            failed.startEffect(effects.bubbles, 1000)
            failed.destroy()
            utility.drawImage(BattleshipImages.MapItem.ATTACK_MISS, playerCursor.x - 3, playerCursor.y - 3)
        }else{
            let shipType: ShipType = ship
            enemyStatus.hit(shipType)

            let sccess = sprites.create(BattleshipImages.MapItem.ATTACK_HIT)
            sccess.setPosition(playerCursor.x, playerCursor.y)
            sccess.startEffect(effects.fire, 1000)
            sccess.destroy()
            utility.drawImage(BattleshipImages.MapItem.ATTACK_HIT, playerCursor.x - 3, playerCursor.y - 3)

            //enemyAttacksText.say(shipType + " Hit!", 500)
        }

        if(enemyStatus.wiped()){
            pause(500)
            game.over(true)
        }
    }
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function() {

})








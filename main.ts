enum GameScene {
    Title,
    DeployingShips,
    PlayerTurn,
    EnemyTurn,
}

/** Initialize */
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
game.setDialogTextColor(0)
game.setDialogFrame(BattleshipImages.Dialog.BOTTOM_DIALOG_FRAME)
game.showLongText("DEPLOY THE SHIPS.\nA: GAME START\nB: REDEPLOY", DialogLayout.Bottom)
currentScene = GameScene.DeployingShips
let playerShipMap: number[][] = [[],[]]
let enemyShipMap: number[][] = [[],[]]
deployPlayerShips(playerShipMap)
deployEnemyShips(enemyShipMap)

/**
 * Prepare Player Cursor
 */
let playerCursor: Sprite = null
let playerCurosrPosX: number = 0
let playerCurosrPosY: number = 0
//currentScene = GameScene.PlayerTurn


let playerAttacksText = textsprite.create("PLAYER")
    playerAttacksText.setMaxFontHeight(5)
    playerAttacksText.setPosition(41, 86)
    let enemyAttacksText = textsprite.create("ENEMY")
    enemyAttacksText.setMaxFontHeight(5)
    enemyAttacksText.setPosition(119, 86)
    let textVisible: boolean = true

function displayAttacksText() {
    //playerAttacksText.setFlag(SpriteFlag.Invisible, true)
    //enemyAttacksText.setFlag(SpriteFlag.Invisible, true)

    if(GameScene.PlayerTurn == currentScene) {
        playerAttacksText.setFlag(SpriteFlag.Invisible, false)
        enemyAttacksText.setFlag(SpriteFlag.Invisible, true)
        playerCursor.setFlag(SpriteFlag.Invisible, false)
    }else if(GameScene.EnemyTurn == currentScene){
        playerAttacksText.setFlag(SpriteFlag.Invisible, true)
        enemyAttacksText.setFlag(SpriteFlag.Invisible, false)
        playerCursor.setFlag(SpriteFlag.Invisible, true)
    }
}
/**
game.onUpdateInterval(500, function() {
    if(GameScene.PlayerTurn == currentScene) {
        //playerAttacksText.setFlag(SpriteFlag.Invisible, textVisible)
    }else if(GameScene.EnemyTurn == currentScene){
        //enemyAttacksText.setFlag(SpriteFlag.Invisible, textVisible)
    }
    textVisible = textVisible ? false : true
})
 */

function startGame() {
    game.splash("GAME START")
    prepareCursor()

    if(ShipOwner.Player == randint(0, 1)) {
        currentScene = GameScene.PlayerTurn
        displayAttacksText()
    }else {
        currentScene = GameScene.EnemyTurn
        enemyTurnAction()
    }
}

function playerTurnAction() {
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
    }

    if(enemyStatus.wiped()){
        pause(500)
        game.over(true)
    }else{
        enemyTurnAction()
    }
}

let enemySearchPosList: String[] = []

function enemyTurnAction() {
    currentScene = GameScene.EnemyTurn
    displayAttacksText()
    pause(500)

    let col: number = randint(0, 9)
    let row: number = randint(0, 9)
    let searchPos: String = col + "_" + row

    if(enemySearchPosList.indexOf(searchPos) > -1) {
        enemyTurnAction()
    } else { 
        enemySearchPosList.push(searchPos)

        let ship = playerShipMap[col][row]
        
        if(ship == null) {
            let failed = sprites.create(BattleshipImages.MapItem.ATTACK_MISS)
            failed.setPosition(7 + (col * 7) + 3, 8 + (row * 7) + 3)
            failed.startEffect(effects.bubbles, 200)
            failed.destroy()
            utility.drawImage(BattleshipImages.MapItem.ATTACK_MISS, 7 + (col * 7), 8 + (row * 7))
        }else{
            let shipType: ShipType = ship
            playerStatus.hit(shipType)

            let sccess = sprites.create(BattleshipImages.MapItem.ATTACK_HIT)
            sccess.setPosition(7 + (col * 7) + 3, 8 + (row * 7) + 3)
            sccess.startEffect(effects.fire, 300)
            sccess.destroy()
            utility.drawImage(BattleshipImages.MapItem.ATTACK_HIT, 7 + (col * 7), 8 + (row * 7))
        }

        if(playerStatus.wiped()){
            pause(500)
            game.over(false)
        }else{
            pause(500)
            currentScene = GameScene.PlayerTurn
            displayAttacksText()
        }
    }
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    if(GameScene.DeployingShips == currentScene) {
        startGame()           
    }else if(GameScene.PlayerTurn == currentScene) {
        playerTurnAction()        
    }else if(GameScene.EnemyTurn == currentScene) {
        //enemyTurnAction()
    }
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function() {
    if(GameScene.DeployingShips == currentScene) {
        redeployPlayerShips(playerShipMap)
    }

})








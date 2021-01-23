enum GameScene {
    Title,
    DeployingShips,
    PlayerTurn,
    EnemyTurn,
    Results,
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
let deployingText = textsprite.create("A:GAMESTART B:REDEPLOY")
deployingText.setMaxFontHeight(5)
deployingText.setPosition(80, 86)
let playerShipMap: number[][] = [[],[]]
let enemyShipMap: number[][] = [[],[]]
deployPlayerShips(playerShipMap)
deployEnemyShips(enemyShipMap)
let playerSearchList: String[] = []
let enemy: EnemyAI = new EnemyAI()

/**
 * Prepare Player Cursor
 */
let playerCursor: Sprite = null
let playerCurosrPosX: number = 0
let playerCurosrPosY: number = 0
let enemyCursor: Sprite = null
let win: boolean = false

/**  
 * Set Turn Text Sprites
*/
let playerAttacksText = textsprite.create("PLAYER")
playerAttacksText.setMaxFontHeight(5)
playerAttacksText.setPosition(41, 86)
playerAttacksText.setFlag(SpriteFlag.Invisible, true)
let enemyAttacksText = textsprite.create("ENEMY")
enemyAttacksText.setMaxFontHeight(5)
enemyAttacksText.setPosition(119, 86)
enemyAttacksText.setFlag(SpriteFlag.Invisible, true)

function displayAttacksText() {
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

function startGame() {
    let playerFistMove: boolean = ShipOwner.Player == randint(0, 1)
    let subTiltle: string = playerFistMove ? "PLAYER" : "ENEMY"
    subTiltle = subTiltle + "'S FIRST MOVE"
    
    game.splash("GAME START", subTiltle)
    prepareCursor()
    deployingText.destroy()

    if(playerFistMove) {
        currentScene = GameScene.PlayerTurn
        displayAttacksText()
    }else {
        currentScene = GameScene.EnemyTurn
        enemyTurnAction()
    }
}

function alreadySearched(): boolean {
    let postStr: String = playerCurosrPosX + "_" + playerCurosrPosY

    if(playerSearchList.indexOf(postStr) > -1) {
        return true
    } else {
        playerSearchList.push(postStr)
        return false
    }
}

function playerTurnAction() {
    if(alreadySearched()) return

    let shipType: ShipType = enemyShipMap[playerCurosrPosX][playerCurosrPosY]

    if(shipType == null) {
        let failed = sprites.create(BattleshipImages.MapItem.ATTACK_MISS)
        failed.setPosition(playerCursor.x, playerCursor.y)
        failed.startEffect(effects.bubbles, 1000)
        failed.destroy()
        utility.drawImage(BattleshipImages.MapItem.ATTACK_MISS, playerCursor.x - 3, playerCursor.y - 3)
        
    }else{
        enemyStatus.hit(shipType)

        let sccess = sprites.create(BattleshipImages.MapItem.ATTACK_HIT)
        sccess.setPosition(playerCursor.x, playerCursor.y)
        sccess.startEffect(effects.fire, 1000)
        sccess.destroy()
        utility.drawImage(BattleshipImages.MapItem.ATTACK_HIT, playerCursor.x - 3, playerCursor.y - 3)
    }

    if(enemyStatus.wiped()){
        win = true
        gameOver()
    }else{
        enemyTurnAction()
    }
}

function enemyTurnAction() {
    currentScene = GameScene.EnemyTurn
    displayAttacksText()
    
    let nextPosStr: string = enemy.getNextPos();
    let col: number = enemy.getPosX(nextPosStr)
    let row: number = enemy.getPosY(nextPosStr)
    let posX: number = 7 + (col * 7) + 3
    let posY: number = 8 + (row * 7) + 3
    enemyCursor.setPosition(posX, posY)
    enemyCursor.setFlag(SpriteFlag.Invisible, false)
    pause(500)
  
    let shipType: ShipType = playerShipMap[col][row]
    
    if(shipType == null) {
        enemy.setShipInfo(ShipType.Miss, col, row)

        let failed = sprites.create(BattleshipImages.MapItem.ATTACK_MISS)
        failed.setPosition(posX, posY)
        failed.startEffect(effects.bubbles, 200)
        failed.destroy()
        utility.drawImage(BattleshipImages.MapItem.ATTACK_MISS, posX - 3, posY - 3)
        
    }else{
        enemy.setShipInfo(shipType, col, row)
        playerStatus.hit(shipType)

        let sccess = sprites.create(BattleshipImages.MapItem.ATTACK_HIT)
        sccess.setPosition(posX, posY)
        sccess.startEffect(effects.fire, 300)
        sccess.destroy()
        utility.drawImage(BattleshipImages.MapItem.ATTACK_HIT, posX - 3, posY - 3)
    }

    if(playerStatus.wiped()){
        win = false
        gameOver()
    }else{
        pause(300)
        enemyCursor.setFlag(SpriteFlag.Invisible, true)
        pause(200)
        currentScene = GameScene.PlayerTurn
        displayAttacksText()
    }
}

function gameOver() {
    currentScene = GameScene.Results
    pause(1000)
    visibleEnemyShips(true)
    changeEnemyShipsColor()
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    if(GameScene.DeployingShips == currentScene) {
        startGame()           
    }else if(GameScene.PlayerTurn == currentScene) {
        playerTurnAction()        
    }else if(GameScene.EnemyTurn == currentScene) {
        return
    }else if(GameScene.Results == currentScene) {
        game.over(win)
    }
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function() {
    if(GameScene.DeployingShips == currentScene) {
        redeployPlayerShips(playerShipMap)
    }else if(GameScene.Results == currentScene) {
        game.over(win)
    }
})

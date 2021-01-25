function prepareCursor() {
    playerCursor = sprites.create(BattleshipImages.MapItem.CURSOR)
    playerCursor.setPosition(87, 11)
    enemyCursor = sprites.create(BattleshipImages.MapItem.CURSOR)
    enemyCursor.setFlag(SpriteFlag.Invisible, true)

    controller.up.onEvent(ControllerButtonEvent.Pressed, function() {
        if(GameScene.PlayerTurn != currentScene) return

        if(playerCursor.y == 11) {
            playerCursor.y = 74
            playerCurosrPosY = 9    
            return
        }

        playerCursor.y = playerCursor.y - 7
        playerCurosrPosY -= 1
    })
    controller.down.onEvent(ControllerButtonEvent.Pressed, function() {
        if(GameScene.PlayerTurn != currentScene) return

        if(playerCursor.y == 74) {
            playerCursor.y = 11
            playerCurosrPosY = 0    
            return
        }

        playerCursor.y = playerCursor.y + 7
        playerCurosrPosY += 1
    })
    controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
        if(GameScene.PlayerTurn != currentScene) return

        if(playerCursor.x == 150) {
            playerCursor.x = 87
            playerCurosrPosX = 0    
            return
        }

        playerCursor.x = playerCursor.x + 7
        playerCurosrPosX += 1
    })
    controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
        if(GameScene.PlayerTurn != currentScene) return
        
        if(playerCursor.x == 87) {
            playerCursor.x = 150
            playerCurosrPosX = 9    
            return
        }

        playerCursor.x = playerCursor.x - 7
        playerCurosrPosX -= 1
    })
}

function redeployPlayerShips(playerShipMap: number[][], enemyShipMap: number[][]) {
    backGround = new BattleshipImages.Background()
    scene.setBackgroundImage(backGround.MAIN_SCREEN)
    deployPlayerShips(playerShipMap)
    deployEnemyShips(enemyShipMap)
}

function deployPlayerShips(shipMap: number[][]) {
    utility.initilaizeMap(shipMap)

    let p_aircraftCarrier = new ShipContext(ShipType.AircraftCarrier, ShipOwner.Player, shipMap)
    let p_battleship = new ShipContext(ShipType.Battleship, ShipOwner.Player, shipMap)
    let p_submarine = new ShipContext(ShipType.Submarine, ShipOwner.Player, shipMap)
    let p_cruiser = new ShipContext(ShipType.Cruiser, ShipOwner.Player, shipMap)
    let p_patrolBoat = new ShipContext(ShipType.PatrolBoat, ShipOwner.Player, shipMap)

    utility.consoleMapLog(shipMap, "PLAYER")
}

let e_patrolBoat: ShipContext
let e_cruiser: ShipContext
let e_submarine: ShipContext
let e_battleship: ShipContext
let e_aircraftCarrier: ShipContext

function deployEnemyShips(shipMap: number[][]) {
    utility.initilaizeMap(shipMap)

    if(e_patrolBoat != null) e_patrolBoat.destroyShipSprite()
    if(e_cruiser != null) e_cruiser.destroyShipSprite()
    if(e_submarine != null) e_submarine.destroyShipSprite()
    if(e_battleship != null) e_battleship.destroyShipSprite()
    if(e_aircraftCarrier != null) e_aircraftCarrier.destroyShipSprite()

    e_aircraftCarrier = new ShipContext(ShipType.AircraftCarrier, ShipOwner.Enemy, shipMap)
    e_battleship = new ShipContext(ShipType.Battleship, ShipOwner.Enemy, shipMap)
    e_cruiser = new ShipContext(ShipType.Cruiser, ShipOwner.Enemy, shipMap)
    e_submarine = new ShipContext(ShipType.Submarine, ShipOwner.Enemy, shipMap)
    e_patrolBoat = new ShipContext(ShipType.PatrolBoat, ShipOwner.Enemy, shipMap)

    utility.consoleMapLog(shipMap, "ENEMY")
}

function changeEnemyShipsColor() {
    if(enemyStatus.patrolBoatLife == 0) {
        e_patrolBoat.shipSprite.image.replace(0xb, 2)
    }
    if(enemyStatus.cruiserLife == 0) {
        e_cruiser.shipSprite.image.replace(0xb, 2)
    }
    if(enemyStatus.submarineLife == 0) {
        e_submarine.shipSprite.image.replace(0xb, 2)
    }
    if(enemyStatus.battleshipLife == 0) {
        e_battleship.shipSprite.image.replace(0xb, 2)
    }
    if(enemyStatus.aircraftcarrierLife == 0) {
        e_aircraftCarrier.shipSprite.image.replace(0xb, 2)
    }
}

function visibleEnemyShips(visible: Boolean) {
    e_aircraftCarrier.shipSprite.setFlag(SpriteFlag.Invisible, !visible)
    e_battleship.shipSprite.setFlag(SpriteFlag.Invisible, !visible)
    e_cruiser.shipSprite.setFlag(SpriteFlag.Invisible, !visible)
    e_submarine.shipSprite.setFlag(SpriteFlag.Invisible, !visible)
    e_patrolBoat.shipSprite.setFlag(SpriteFlag.Invisible, !visible)
}

function prepareInformation() {
    let p_patrolBoat_info: Sprite = sprites.create(utility.getShipImage(ShipType.PatrolBoat, ShipDirection.Horizontal))
    let p_cruiser_info: Sprite = sprites.create(utility.getShipImage(ShipType.Cruiser, ShipDirection.Horizontal))
    let p_submarine_info: Sprite = sprites.create(utility.getShipImage(ShipType.Submarine, ShipDirection.Horizontal))
    let p_battleSip_info: Sprite = sprites.create(utility.getShipImage(ShipType.Battleship, ShipDirection.Horizontal))
    let p_aircraftCarrier_info: Sprite = sprites.create(utility.getShipImage(ShipType.AircraftCarrier, ShipDirection.Horizontal))
    p_patrolBoat_info.setPosition(13, 97)
    p_cruiser_info.setPosition(37, 97)
    p_submarine_info.setPosition(65, 97)
    p_battleSip_info.setPosition(20, 111)
    p_aircraftCarrier_info.setPosition(58, 111)
    
    let p_patrolBoat_statusbar: StatusBarSprite = statusbars.create(3, 4, 0)
    p_patrolBoat_statusbar.attachToSprite(p_patrolBoat_info)
    p_patrolBoat_statusbar.max = 2

    let p_cruiser_statusbar: StatusBarSprite = statusbars.create(3, 6, 0)
    p_cruiser_statusbar.attachToSprite(p_cruiser_info)
    p_cruiser_statusbar.max = 3

    let p_submarine_statusbar: StatusBarSprite = statusbars.create(3, 6, 0)
    p_submarine_statusbar.attachToSprite(p_submarine_info)
    p_submarine_statusbar.max = 3

    let p_battleSip_statusbar: StatusBarSprite = statusbars.create(3, 8, 0)
    p_battleSip_statusbar.attachToSprite(p_battleSip_info)
    p_battleSip_statusbar.max = 4
    let p_aircraftCarrier_statusbar: StatusBarSprite = statusbars.create(3, 10, 0)
    p_aircraftCarrier_statusbar.attachToSprite(p_aircraftCarrier_info)
    p_aircraftCarrier_statusbar.max = 5

    playerStatus.patrolBoatStatusBar = p_patrolBoat_statusbar
    playerStatus.cruiserStatusBar = p_cruiser_statusbar
    playerStatus.submarineStatusBar = p_submarine_statusbar
    playerStatus.battleshipStatusBar = p_battleSip_statusbar
    playerStatus.aircraftcarrierStatusBar = p_aircraftCarrier_statusbar

    let e_patrolBoat_info: Sprite = sprites.create(utility.getShipImage(ShipType.PatrolBoat, ShipDirection.Horizontal))
    let e_cruiser_info: Sprite = sprites.create(utility.getShipImage(ShipType.Cruiser, ShipDirection.Horizontal))
    let e_submarine_info: Sprite = sprites.create(utility.getShipImage(ShipType.Submarine, ShipDirection.Horizontal))
    let e_battleSip_info: Sprite = sprites.create(utility.getShipImage(ShipType.Battleship, ShipDirection.Horizontal))
    let e_aircraftCarrier_info: Sprite = sprites.create(utility.getShipImage(ShipType.AircraftCarrier, ShipDirection.Horizontal))
    e_patrolBoat_info.setPosition(96, 97)
    e_cruiser_info.setPosition(120, 97)
    e_submarine_info.setPosition(148, 97)
    e_battleSip_info.setPosition(103, 111)
    e_aircraftCarrier_info.setPosition(141, 111)

    let e_patrolBoat_statusbar: StatusBarSprite = statusbars.create(3, 4, 0)
    e_patrolBoat_statusbar.attachToSprite(e_patrolBoat_info)
    e_patrolBoat_statusbar.max = 2

    let e_cruiser_statusbar: StatusBarSprite = statusbars.create(3, 6, 0)
    e_cruiser_statusbar.attachToSprite(e_cruiser_info)
    e_cruiser_statusbar.max = 3

    let e_submarine_statusbar: StatusBarSprite = statusbars.create(3, 6, 0)
    e_submarine_statusbar.attachToSprite(e_submarine_info)
    e_submarine_statusbar.max = 3

    let e_battleSip_statusbar: StatusBarSprite = statusbars.create(3, 8, 0)
    e_battleSip_statusbar.attachToSprite(e_battleSip_info)
    e_battleSip_statusbar.max = 4

    let e_aircraftCarrier_statusbar: StatusBarSprite = statusbars.create(3, 10, 0)
    e_aircraftCarrier_statusbar.attachToSprite(e_aircraftCarrier_info)
    e_aircraftCarrier_statusbar.max = 5

    enemyStatus.patrolBoatStatusBar = e_patrolBoat_statusbar
    enemyStatus.cruiserStatusBar = e_cruiser_statusbar
    enemyStatus.submarineStatusBar = e_submarine_statusbar
    enemyStatus.battleshipStatusBar = e_battleSip_statusbar
    enemyStatus.aircraftcarrierStatusBar = e_aircraftCarrier_statusbar
}
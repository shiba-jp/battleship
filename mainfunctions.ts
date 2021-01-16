function prepareCursor() {
    playerCursor = sprites.create(BattleshipImages.MapItem.CURSOR)
    playerCursor.setPosition(87, 11)
    controller.up.onEvent(ControllerButtonEvent.Pressed, function() {
        if(playerCursor.y == 11) {
            playerCursor.y = 74
            playerCurosrPosY = 9    
            return
        }

        playerCursor.y = playerCursor.y - 7
        playerCurosrPosY -= 1
    })
    controller.down.onEvent(ControllerButtonEvent.Pressed, function() {
        if(playerCursor.y == 74) {
            playerCursor.y = 11
            playerCurosrPosY = 0    
            return
        }

        playerCursor.y = playerCursor.y + 7
        playerCurosrPosY += 1
    })
    controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
        if(playerCursor.x == 150) {
            playerCursor.x = 87
            playerCurosrPosX = 0    
            return
        }

        playerCursor.x = playerCursor.x + 7
        playerCurosrPosX += 1
    })
    controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
        if(playerCursor.x == 87) {
            playerCursor.x = 150
            playerCurosrPosX = 9    
            return
        }

        playerCursor.x = playerCursor.x - 7
        playerCurosrPosX -= 1
    })
}


function redeployPlayerShips(shipMap: number[][]) {
    let replace: boolean = false

    do {
        deployPlayerShips(shipMap)
        pause(300)

        replace = !game.ask("A:GAME START  B:REDEPLOY")
        if(replace) {
            backGround = new BattleshipImages.Background()
            scene.setBackgroundImage(backGround.MAIN_SCREEN)
        }
    }while(replace)
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

function deployEnemyShips(shipMap: number[][]) {
    utility.initilaizeMap(shipMap)

    let e_aircraftCarrier = new ShipContext(ShipType.AircraftCarrier, ShipOwner.Enemy, shipMap)
    let e_battleship = new ShipContext(ShipType.Battleship, ShipOwner.Enemy, shipMap)
    let e_cruiser = new ShipContext(ShipType.Cruiser, ShipOwner.Enemy, shipMap)
    let e_submarine = new ShipContext(ShipType.Submarine, ShipOwner.Enemy, shipMap)
    let e_patrolBoat = new ShipContext(ShipType.PatrolBoat, ShipOwner.Enemy, shipMap)

    utility.consoleMapLog(shipMap, "ENEMY")
}

function prepareInformation() {
    let p_patrolBoat: Sprite = sprites.create(BattleshipImages.Ship.PATROL_BOAT_H)
    let p_cruiser: Sprite = sprites.create(BattleshipImages.Ship.CRUISER_H)
    let p_submarine: Sprite = sprites.create(BattleshipImages.Ship.SUBMARINE_H)
    let p_battleSip: Sprite = sprites.create(BattleshipImages.Ship.BATTLESHIP_H)
    let p_aircraftCarrier: Sprite = sprites.create(BattleshipImages.Ship.AIRCRAFT_CARRIER_H)
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


    let e_patrolBoat: Sprite = sprites.create((new BattleshipImages.Ship()).PATROL_BOAT_H)
    let e_cruiser: Sprite = sprites.create((new BattleshipImages.Ship()).CRUISER_H)
    let e_submarine: Sprite = sprites.create((new BattleshipImages.Ship()).SUBMARINE_H)
    let e_battleSip: Sprite = sprites.create((new BattleshipImages.Ship()).BATTLESHIP_H)
    let e_aircraftCarrier: Sprite = sprites.create((new BattleshipImages.Ship()).AIRCRAFT_CARRIER_H)
    e_patrolBoat.setPosition(96, 97)
    e_cruiser.setPosition(120, 97)
    e_submarine.setPosition(148, 97)
    e_battleSip.setPosition(103, 111)
    e_aircraftCarrier.setPosition(141, 111)
    let statusbarE: StatusBarSprite = statusbars.create(3, 4, 0)
    statusbarE.attachToSprite(e_patrolBoat)
    statusbarE.max = 2
    let statusbarE2: StatusBarSprite = statusbars.create(3, 6, 0)
    statusbarE2.attachToSprite(e_cruiser)
    statusbarE2.max = 3
    let statusbarE3: StatusBarSprite = statusbars.create(3, 6, 0)
    statusbarE3.attachToSprite(e_submarine)
    statusbarE3.max = 3
    let statusbarE4: StatusBarSprite = statusbars.create(3, 8, 0)
    statusbarE4.attachToSprite(e_battleSip)
    statusbarE4.max = 4
    let statusbarE5: StatusBarSprite = statusbars.create(3, 10, 0)
    statusbarE5.attachToSprite(e_aircraftCarrier)
    statusbarE5.max = 5

    enemyStatus.patrolBoatStatusBar = statusbarE
    enemyStatus.cruiserStatusBar = statusbarE2
    enemyStatus.submarineStatusBar = statusbarE3
    enemyStatus.battleshipStatusBar = statusbarE4
    enemyStatus.aircraftcarrierStatusBar = statusbarE5
}
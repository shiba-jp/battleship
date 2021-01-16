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


    let e_patrolBoat: Sprite = sprites.create(BattleshipImages.Ship.PATROL_BOAT_H)
    let e_cruiser: Sprite = sprites.create(BattleshipImages.Ship.CRUISER_H)
    let e_submarine: Sprite = sprites.create(BattleshipImages.Ship.SUBMARINE_H)
    let e_battleSip: Sprite = sprites.create(BattleshipImages.Ship.BATTLESHIP_H)
    let e_aircraftCarrier: Sprite = sprites.create(BattleshipImages.Ship.AIRCRAFT_CARRIER_H)
    e_patrolBoat.setPosition(96, 97)
    e_cruiser.setPosition(120, 97)
    e_submarine.setPosition(148, 97)
    e_battleSip.setPosition(103, 111)
    e_aircraftCarrier.setPosition(141, 111)
    let statusbarE = statusbars.create(3, 4, 0)
    statusbarE.attachToSprite(e_patrolBoat)
    statusbarE.value = 50
    let statusbarE2 = statusbars.create(3, 6, 0)
    statusbarE2.attachToSprite(e_cruiser)
    statusbarE2.value = 30
    let statusbarE3 = statusbars.create(3, 6, 0)
    statusbarE3.attachToSprite(e_submarine)
    statusbarE3.value = 100
    let statusbarE4 = statusbars.create(3, 8, 0)
    statusbarE4.attachToSprite(e_battleSip)
    statusbarE4.value = 25
    let statusbarE5 = statusbars.create(3, 10, 0)
    statusbarE5.attachToSprite(e_aircraftCarrier)
    statusbarE5.value = 75
}

function prepareCursor() {
    let playerCursor = sprites.create(BattleshipImages.MapItem.CURSOR)
    playerCursor.setPosition(87, 11)
    controller.up.onEvent(ControllerButtonEvent.Pressed, function() {
        if(playerCursor.y == 11) return
        playerCursor.y = playerCursor.y - 7
    })
    controller.down.onEvent(ControllerButtonEvent.Pressed, function() {
        if(playerCursor.y == 74) return
        playerCursor.y = playerCursor.y + 7
    })
    controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
        if(playerCursor.x == 150) return
        playerCursor.x = playerCursor.x + 7
    })
    controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
        if(playerCursor.x == 87) return
        playerCursor.x = playerCursor.x - 7
    })
}

function replaceShips(shipMap: number[][]) {
    for(let i = 0; i < 10; i++) {
        shipMap[i] = []
        for(let j = 0; j < 10;j ++) {
            shipMap[i][j] = null
        }
    }

    
}
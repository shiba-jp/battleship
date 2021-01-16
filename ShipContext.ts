enum ShipDirection{
    Horizontal = 0,
    Vertical = 1,
}

enum ShipType {
    PatrolBoat = 0,
    Submarine = 1,
    Cruiser = 2,
    Battleship = 3,
    AircraftCarrier = 4,
}

class ShipContext {

    private _shipType: ShipType

    private _derection: ShipDirection

    get shipType(): ShipType {
        return this._shipType
    }

    get derection(): ShipDirection {
        return this._derection
    }

    constructor(shipType: ShipType, shipMap: number[][]) {
        this._shipType = shipType
        this._derection = randint(0, 1) == 0 ? ShipDirection.Horizontal : ShipDirection.Vertical
        this.place(shipMap)
    }

    private place(shipMap: number[][]) {
        let shipLength: number = this.getShipLength()
        let max: number = 9 - shipLength;
        let shipImage: Image = null

        let posX: number = randint(0, this._derection == ShipDirection.Horizontal ? max : 9)
        let posY: number = randint(0, this._derection == ShipDirection.Vertical ? max : 9)

        if(this.canPlace(posX, posY, shipLength, shipMap)) {
            if(this._derection == ShipDirection.Horizontal) {
                for(let i = posX; i < posX + shipLength; i++) {
                    shipMap[i][posY] = this._shipType
                }
                shipImage = BattleshipImages.Ship.SHIP_IMAGES_H[this.shipType]
            }else if(this._derection == ShipDirection.Vertical) {
                for(let j = posY; j < posY + shipLength; j++) {
                    shipMap[posX][j] = this._shipType
                }
                shipImage = BattleshipImages.Ship.SHIP_IMAGES_V[this.shipType]
            }

            if(randint(0, 1) == 1) shipImage = shipImage.rotated(180)
            scene.backgroundImage().drawTransparentImage(shipImage, 6 + (posX * 7), 7 + (posY * 7))

        } else {
            this.place(shipMap)
        }
    }

    private canPlace(posX: number, posY: number, shipLength: number, shipMap: number[][]): boolean {
        let canPlace = true

        if(this._derection == ShipDirection.Horizontal) {
            for(let i = posX; i < posX + shipLength; i++) {
                if(shipMap[i][posY] != null) {
                    canPlace = false
                    break
                }
            }
        }else if(this._derection == ShipDirection.Vertical) {
            for(let j = posY; j < posY + shipLength; j++) {
                if(shipMap[posX][j] != null) {
                    canPlace = false
                    break
                }
            }
        }

        return canPlace
    }

    private getShipLength(): number {
        let length = 0

        switch(this._shipType) {
            case ShipType.PatrolBoat:
                length = 2
                break
            case ShipType.Submarine:
            case ShipType.Cruiser:
                length = 3
                break
            case ShipType.Battleship:
                length = 4
                break
            case ShipType.AircraftCarrier:
                length = 5
                break
        }

        return length
    }
}


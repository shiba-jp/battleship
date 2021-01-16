enum ShipDirection{
    Vertical = 0,
    Horizontal = 1,
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

    constructor(shipType: ShipType, shipMap: number[][]) {
        this._shipType = shipType
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


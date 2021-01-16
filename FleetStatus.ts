class FleetStatus {

    private _patrolBoatLife: number = 2

    private _submarineLife: number = 3

    private _cruiserLife: number = 3

    private _battleshipLife: number = 4

    private _aircraftcarrierLife: number = 5

    get patrolBoatLife(): number {
        return this._patrolBoatLife
    }

    get submarineLife(): number {
        return this._submarineLife
    }

    get cruiserLife(): number {
        return this._cruiserLife
    }

    get battleshipLife(): number {
        return this._battleshipLife
    }

    get aircraftcarrierLife(): number {
        return this._aircraftcarrierLife
    }

    constructor() {
    }

    public hit(shiptype: ShipType) {
        switch(shiptype) {
            case ShipType.PatrolBoat:
                this._patrolBoatLife -= 1
                break
            case ShipType.Submarine:
                this._submarineLife -= 1
                break
            case ShipType.Cruiser:
                this._cruiserLife -= 1
                break
            case ShipType.Battleship:
                this._battleshipLife -= 1
                break
            case ShipType.AircraftCarrier:
                this._aircraftcarrierLife -= 1
                break
        }
    }

    public wiped(): boolean {
        let allLife: number = this._patrolBoatLife + 
        this._submarineLife + this._cruiserLife + 
        this._battleshipLife + this._aircraftcarrierLife

        return allLife == 0
    }
}

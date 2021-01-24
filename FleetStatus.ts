class FleetStatus {

    private _patrolBoatLife: number = 2

    private _submarineLife: number = 3

    private _cruiserLife: number = 3

    private _battleshipLife: number = 4

    private _aircraftcarrierLife: number = 5

    private _patrolBoatStatusBar: StatusBarSprite = null

    private _submarineStatusBar: StatusBarSprite = null

    private _cruiserStatusBar: StatusBarSprite = null

    private _battleshipStatusBar: StatusBarSprite = null

    private _aircraftcarrierStatusBar: StatusBarSprite = null

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

    get patrolBoatStatusBar(): StatusBarSprite {
        return this._patrolBoatStatusBar
    }

    get submarineStatusBar(): StatusBarSprite {
        return this._submarineStatusBar
    }

    get cruiserStatusBar(): StatusBarSprite {
        return this._cruiserStatusBar
    }

    get battleshipStatusBar(): StatusBarSprite {
        return this._battleshipStatusBar
    }

    get aircraftcarrierStatusBar(): StatusBarSprite {
        return this._aircraftcarrierStatusBar
    }

    set patrolBoatStatusBar(statusbar: StatusBarSprite) {
        this._patrolBoatStatusBar = statusbar
    }

    set submarineStatusBar(statusbar: StatusBarSprite) {
        this._submarineStatusBar = statusbar
    }

    set cruiserStatusBar(statusbar: StatusBarSprite) {
        this._cruiserStatusBar = statusbar
    }

    set battleshipStatusBar(statusbar: StatusBarSprite) {
        this._battleshipStatusBar = statusbar
    }

    set aircraftcarrierStatusBar(statusbar: StatusBarSprite) {
        this._aircraftcarrierStatusBar = statusbar
    }

    constructor() {
    }

    public getShipLife(shipType: ShipType): number {
        let life: number = 0

        switch(shipType) {
            case ShipType.PatrolBoat:
                life = this._patrolBoatLife
                break
            case ShipType.Cruiser:
                life = this._cruiserLife
                break
            case ShipType.Submarine:
                life = this._submarineLife
                break
            case ShipType.Battleship:
                life = this._battleshipLife
                break
            case ShipType.AircraftCarrier:
                life = this._aircraftcarrierLife
                break
        }

        return life
    }

    public hit(shiptype: ShipType) {
        switch(shiptype) {
            case ShipType.PatrolBoat:
                this._patrolBoatLife -= 1
                this._patrolBoatStatusBar.value -= 1
                if(this._patrolBoatLife == 0) {
                    this._patrolBoatStatusBar.spriteAttachedTo().image.replace(0xb, 2)
                }
                break
            case ShipType.Submarine:
                this._submarineLife -= 1
                this._submarineStatusBar.value -= 1
                if(this._submarineLife == 0) {
                    this._submarineStatusBar.spriteAttachedTo().image.replace(0xb, 2)
                }
                break
            case ShipType.Cruiser:
                this._cruiserLife -= 1
                this._cruiserStatusBar.value -= 1
                if(this._cruiserLife == 0) {
                    this._cruiserStatusBar.spriteAttachedTo().image.replace(0xb, 2)
                }
                break
            case ShipType.Battleship:
                this._battleshipLife -= 1
                this._battleshipStatusBar.value -= 1
                if(this._battleshipLife == 0) {
                    this._battleshipStatusBar.spriteAttachedTo().image.replace(0xb, 2)
                }
                break
            case ShipType.AircraftCarrier:
                this._aircraftcarrierLife -= 1
                this._aircraftcarrierStatusBar.value -= 1
                if(this._aircraftcarrierLife == 0) {
                    this._aircraftcarrierStatusBar.spriteAttachedTo().image.replace(0xb, 2)
                }
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

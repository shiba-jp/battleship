class HitShipInfo {
    shipType: ShipType = null

    hitPosX: number[] = []
    hitPosY: number[] = []

    hitDirection: ShipDirection = null

    shipLength: number = null

    constructor(shipType: ShipType ) {
        this.shipType = shipType
        this.shipLength = utility.getShipLength(shipType)
    }

    hasSunk(): boolean {
        return this.hitPosX.length == this.shipLength
    }
}

class EnemyAI {
    enemyStrategyMap: number[][] = [[],[]]

    hitShips: HitShipInfo[] = []

    posList: String[] = []

    constructor() {
        utility.initilaizeMap(this.enemyStrategyMap)
        this.createPosList()
    }

    private createPosList() {
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                this.posList.push(this.getPosString(i,j))
            }
        }
    }

    /**
     * Record Action
     */
    public setShipInfo(shipType: ShipType, x: number, y: number) {
        this.enemyStrategyMap[x][y] = shipType

        if(ShipType.Miss != shipType) {
            if(!this.hitShips.some(item => item.shipType === shipType)) {
                let hitShip: HitShipInfo = new HitShipInfo(shipType)
                this.hitShips.push(hitShip)
            }

            let hitShip = this.hitShips.find(item => item.shipType === shipType)
            hitShip.hitPosX.push(x)
            hitShip.hitPosY.push(y)
        }
        
        let posIndex = this.posList.indexOf(this.getPosString(x, y))
        this.posList.splice(posIndex, 1)
    }

    /**
     * Think Next Move
     */
    public getNextPos(): String {
        let posString: String = this.posList[randint(0, this.posList.length - 1)]
        return posString
    }

    public getNextPosX(posString: String): number {
        return parseInt(posString.split('_')[0]);
    }

    public getNextPosY(posString: String): number {
        return parseInt(posString.split('_')[1]);
    }

    private getPosString(x: number, y: number): String {
        return x + "_" + y
    }
}
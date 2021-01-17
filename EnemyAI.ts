class EnemyAI {
    private _enemyStrategyMap: number[][] = [[],[]]

    private _lastHitShipType: ShipType = null

    private _lastHitPosX: number = null

    private _lastHitPosY: number = null


    private _lastShipType: ShipType = null

    private _lastPosX: number = null

    private _lastPosY: number = null

    private _nextPosX: number = null

    private _nextPosY: number = null

    private _hitCountMap: {[shipType: number]: number} = {
      0 : 0, //ShipType.PatrolBoat
      1 : 0, //ShipType.Cruiser
      2 : 0, //ShipType.Submarine
      3 : 0, //ShipType.Battleship
      4 : 0  //ShipType.AircraftCarrier
    }

    private _shipDirectionMap: {[shipType: number]: number} = {
      0 : null, //ShipType.PatrolBoat
      1 : null, //ShipType.Cruiser
      2 : null, //ShipType.Submarine
      3 : null, //ShipType.Battleship
      4 : null  //ShipType.AircraftCarrier
    }

    private _posList: String[] = []

    constructor() {
        utility.initilaizeMap(this._enemyStrategyMap)
        this.createPosList()
    }

    private createPosList() {
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                this._posList.push(this.getPosString(i,j))
            }
        }
    }

    public setShipInfo(shipType: ShipType, x: number, y: number) {
        this._enemyStrategyMap[x][y] = shipType
        this._lastShipType = shipType
        this._lastPosX = x
        this._lastPosY = y

        if(ShipType.Miss != shipType) {
            this._hitCountMap[shipType] += 1 
            this._lastHitShipType = shipType
            this._lastHitPosX = x
            this._lastHitPosY = y
            console.logValue("HitShipCount", shipType + ":" + this._hitCountMap[shipType])
        }

        if(this._hitCountMap[shipType] > 1) {
            //船の方向を把握
            if((x == 0 && this._enemyStrategyMap[x + 1][y] == shipType)
            || (x == 9 && this._enemyStrategyMap[x - 1][y] == shipType)
            || (x > 0 && x < 9 && this._enemyStrategyMap[x + 1][y] == shipType)
            || (x > 0 && x < 9 && this._enemyStrategyMap[x - 1][y] == shipType)) {
                this._shipDirectionMap[shipType] = ShipDirection.Horizontal
            }else if((y == 0 && this._enemyStrategyMap[x][y + 1] == shipType)
                  || (y == 9 && this._enemyStrategyMap[x][y - 1] == shipType)
                  || (y > 0 && y < 9 && this._enemyStrategyMap[x][y + 1] == shipType)
                  || (y > 0 && y < 9 && this._enemyStrategyMap[x][y - 1] == shipType)) {
                this._shipDirectionMap[shipType] = ShipDirection.Vertical
            }

            console.logValue("ShipDirection", shipType + ":" + this._shipDirectionMap[shipType])
        }

        let posIndex = this._posList.indexOf(this.getPosString(x, y))
        this._posList.splice(posIndex, 1)
    }

    public getNextPos(): String {
        /**
        //前回が空振りの場合はランダム
        if(this._lastShipType == null
        ||  this._lastHitShipType == null
        || (this._lastShipType != ShipType.Miss && this.hasSunk(this._lastShipType))) {
            //return this._posList[randint(0, this._posList.length - 1)]
            this.getPossibleRandam()
            return this.getPosString(this._nextPosX, this._nextPosY)
        }
        
        let targetShip: ShipType = this._lastShipType
        let hitCount: number = this._hitCountMap[targetShip]
        let remainingCount: number = this.getShipLength(targetShip) - hitCount
        let lastX: number = this._lastPosX
        let lastY: number = this._lastPosY
        let nextX: number = 0
        let nextY: number = 0

        let posString: String = this._posList[randint(0, this._posList.length - 1)]
        return posString
         */
        this.getPossibleRandam()
        return this.getPosString(this._nextPosX, this._nextPosY)
    }

    private searchTonari() {

    }

    private getPossibleRandam() {
        let posStr = this._posList[randint(0, this._posList.length - 1)]
        let x = this.getNextPosX(posStr)
        let y = this.getNextPosY(posStr)

        if(this.isPossiblePos(x, y)) {
            this._nextPosX = x
            this._nextPosY = y
        }else {
            this.getPossibleRandam()
        }
    }

    private isPossiblePos(x: number, y: number): boolean {
        let right = 0
        let left = 0
        let horizontal = 0
        let up = 0
        let down = 0
        let vertical = 0
        
        if(x < 9) {
            for(let i = x + 1; i < 10; i++) {
                if(this._enemyStrategyMap[i][y] != ShipType.Miss) {
                    right++
                } else {break}
            }
        }
        if(x > 0) {
            for(let i = x - 1; i >= 0; i--) {
                if(this._enemyStrategyMap[i][y] != ShipType.Miss) {
                    left++
                } else {break}
            }
        }
        horizontal = left + 1 + right

        if(y < 9) {
            for(let i = y + 1; i < 10; i++) {
                if(this._enemyStrategyMap[x][i] != ShipType.Miss) {
                    down++
                } else {break}
            }
        }
        if(y > 0) {
            for(let i = y - 1; i >= 0; i--) {
                if(this._enemyStrategyMap[x][i] != ShipType.Miss) {
                    up++
                } else {break}
            }
        }
        vertical = up + 1 + down

        return horizontal >= 2 || vertical >= 2
    }

    private hasSunk(shipType: ShipType): boolean {
        return this._hitCountMap[shipType] == this.getShipLength(shipType)
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

    private getShipLength(shipType: ShipType): number {
        let length = 0

        switch(shipType) {
            case ShipType.PatrolBoat:
                length = 2
                break
            case ShipType.Cruiser:
            case ShipType.Submarine:
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
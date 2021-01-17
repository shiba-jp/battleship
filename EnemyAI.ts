class EnemyAI {
    private _enemyStrategyMap: number[][] = [[],[]]

    private _lastShipType: ShipType = null

    private _posList: String[] = []

    constructor() {
        utility.initilaizeMap(this._enemyStrategyMap)
        this.createPosList()
    }

    private createPosList() {
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 9; j++) {
                this._posList.push(this.getPosString(i,j))
            }
        }
    }

    public setShipInfo(shipType: ShipType, x: number, y: number) {
        this._enemyStrategyMap[x][y] = shipType
        this._lastShipType = shipType

        let posIndex = this._posList.indexOf(this.getPosString(x, y))
        this._posList.splice(posIndex, 1)
    }

    public getNextPos(): String {
        let posString: String = this._posList[randint(0, this._posList.length - 1)]
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
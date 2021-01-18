enum HitShipDirection {
    Horizontal = 0,
    Vertical = 1,
    Unknown = 2,
}

class HitShipInfo {
    shipType: ShipType = null

    hitPosX: number[] = []
    hitPosY: number[] = []

    shipLength: number = null

    enemyStrategyMap: number[][] = null

    constructor(shipType: ShipType, enemyStrategyMap: number[][]) {
        this.shipType = shipType
        this.shipLength = utility.getShipLength(shipType)
        this.enemyStrategyMap = enemyStrategyMap
    }

    hasSunk(): boolean {
        return this.hitPosX.length == this.shipLength
    }

    direction() :HitShipDirection {
        if(this.hitPosX.length < 2) {
            let xSpaceCount: number = 0
            let ySpaceCount: number = 0

            let x: number = this.hitPosX[0]
            let y: number = this.hitPosY[0]

            let result: HitShipDirection = HitShipDirection.Unknown

            if(x == 0){
                for(let i = x + 1; i < 10; i++){
                    if(this.enemyStrategyMap[i][y] == null) {
                        xSpaceCount += 1
                    }else{
                        break
                    }
                }
                let spaceX: number = xSpaceCount + 1
                if(this.shipLength > spaceX) {
                    result = HitShipDirection.Vertical
                }
            }
            if(x == 9){
                for(let i = x - 1; i >= 0; i--){
                    if(this.enemyStrategyMap[i][y] == null) {
                        xSpaceCount += 1
                    }else{
                        break
                    }
                }
                let spaceX: number = xSpaceCount + 1
                if(this.shipLength > spaceX) {
                    result = HitShipDirection.Vertical
                }
            }
            if(y == 0){
                for(let i = y + 1; i < 10; i++){
                    if(this.enemyStrategyMap[x][i] == null) {
                        ySpaceCount += 1
                    }else{
                        break
                    }
                }
                let spaceY: number = ySpaceCount + 1
                if(this.shipLength > spaceY) {
                    result = HitShipDirection.Horizontal
                }
            }
            if(y == 9){
                for(let i = y - 1; i >= 0; i--){
                    if(this.enemyStrategyMap[x][i] == null) {
                        ySpaceCount += 1
                    }else{
                        break
                    }
                }
                let spaceY: number = ySpaceCount + 1
                if(this.shipLength > spaceY) {
                    result = HitShipDirection.Horizontal
                }
            }
            if(x > 0 && x < 9) {
                for(let i = x + 1; i < 10; i++){
                    if(this.enemyStrategyMap[i][y] == null) {
                        xSpaceCount += 1
                    }else{
                        break
                    }
                }
                for(let i = x - 1; i >= 0; i--){
                    if(this.enemyStrategyMap[i][y] == null) {
                        xSpaceCount += 1
                    }else{
                        break
                    }
                }
                let spaceX: number = xSpaceCount + 1
                if(this.shipLength > spaceX) {
                    result = HitShipDirection.Vertical
                }
            }
            if(y > 0 && y < 9) {
                for(let i = y + 1; i < 10; i++){
                    if(this.enemyStrategyMap[x][i] == null) {
                        ySpaceCount += 1
                    }else{
                        break
                    }
                }
                for(let i = y - 1; i >= 0; i--){
                    if(this.enemyStrategyMap[x][i] == null) {
                        ySpaceCount += 1
                    }else{
                        break
                    }
                }
                let spaceY: number = ySpaceCount + 1
                if(this.shipLength > spaceY) {
                    result = HitShipDirection.Horizontal
                }
            }

            return result
        }else if(this.hitPosX[0] == this.hitPosX[1]) {
            return HitShipDirection.Vertical
        }else {
            return HitShipDirection.Horizontal
        }
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
            if(!this.hitShips.some(s => s.shipType === shipType)) {
                let hitShip: HitShipInfo = new HitShipInfo(shipType, this.enemyStrategyMap)
                this.hitShips.push(hitShip)
            }

            let hitShip = this.hitShips.find(s => s.shipType === shipType)
            hitShip.hitPosX.push(x)
            hitShip.hitPosY.push(y)
        }
        
        let posIndex = this.posList.indexOf(this.getPosString(x, y))
        this.posList.splice(posIndex, 1)
    }

    swap(arr:number[], i:number, j:number){
        arr[i] = [arr[j], arr[j] = arr[i]][0];
        return arr;
    }

    /**
     * Think Next Move
     */
    public getNextPos(): String {
        if(this.hitShips.length != null && this.hitShips.some(s => !s.hasSunk())) {
            let target: HitShipInfo = this.hitShips.find(s => !s.hasSunk())

            for(let i = target.hitPosX.length; i >= 0; i--) {
                for(let j = 0; j < i; j++) {
                    if(target.hitPosX[j] > target.hitPosX[j+1]) {
                        target.hitPosX = this.swap(target.hitPosX, j, (j + 1))
                    }
                }
            }

            for(let i = target.hitPosY.length; i >= 0; i--) {
                for(let j = 0; j < i; j++) {
                    if(target.hitPosY[j] > target.hitPosY[j+1]) {
                        target.hitPosY = this.swap(target.hitPosY, j, (j + 1))
                    }
                }
            }

            let minX = target.hitPosX[0];
            let maxX = target.hitPosX[target.hitPosX.length - 1]
            let minY = target.hitPosY[0];
            let maxY = target.hitPosY[target.hitPosY.length - 1]
            let nextX: number = 0
            let nextY: number = 0

            if(target.direction() == HitShipDirection.Unknown) {
                if(minX == 0 && minY == 0) {
                    //left top
                    if(this.enemyStrategyMap[minX + 1][minY] == null) {
                        nextX = minX + 1
                        nextY = minY
                    }else {
                        nextX = minX
                        nextY = minY + 1
                    }
                }else if (maxX == 9 && minY == 0) {
                    //right top
                    if(this.enemyStrategyMap[maxX - 1][minY] == null) {
                        nextX = minX - 1
                        nextY = minY
                    }else {
                        nextX = minX
                        nextY = minY + 1
                    }
                }else if (minX == 0 && maxY == 9) {
                    //left bottom
                    if(this.enemyStrategyMap[minX + 1][maxY] == null) {
                        nextX = minX + 1
                        nextY = maxY
                    }else {
                        nextX = minX
                        nextY = maxY - 1
                    }
                }else if (maxX == 9 && maxY == 9) {
                    //right bottom
                    if(this.enemyStrategyMap[maxX - 1][maxY] == null) {
                        nextX = maxX - 1
                        nextY = maxY
                    }else {
                        nextX = maxX
                        nextY = maxY + 1
                    }
                }else {
                    //inner
                    if(this.enemyStrategyMap[minX + 1][minY] == null) {
                        nextX = minX + 1
                        nextY = minY
                    }else if(this.enemyStrategyMap[minX - 1][minY] == null) {
                        nextX = minX - 1
                        nextY = minY
                    }else if(this.enemyStrategyMap[minX][minY - 1] == null) {
                        nextX = minX
                        nextY = minY - 1
                    }else if(this.enemyStrategyMap[minX][minY + 1] == null) {
                        nextX = minX
                        nextY = minY + 1
                    }
                }

                return this.getPosString(nextX, nextY)

            }else if(target.direction() == HitShipDirection.Horizontal) {
                if(minX == 0) {
                    nextX = maxX + 1
                    nextY = minY
                }
                if(maxX == 9) {
                    nextX = minX - 1
                    nextY = minY
                }
                if(minX > 0 && maxX < 10) {
                    if(this.enemyStrategyMap[minX - 1][minY] == null) {
                        nextX = minX - 1
                        nextY = minY
                    }
                    if(this.enemyStrategyMap[maxX + 1][minY] == null) {
                        nextX = maxX + 1
                        nextY = minY
                    }
                }

                return this.getPosString(nextX, nextY)

            }else {
                if(minY == 0) {
                    nextX = minX
                    nextY = maxY + 1
                }
                if(maxX == 9) {
                    nextX = minX
                    nextY = minY - 1
                }
                if(minY > 0 && maxY < 10) {
                    if(this.enemyStrategyMap[minX][minY - 1] == null) {
                        nextX = minX
                        nextY = minY - 1
                    }
                    if(this.enemyStrategyMap[minX][maxY + 1] == null) {
                        nextX = minX
                        nextY = maxY + 1
                    }
                }

                return this.getPosString(nextX, nextY)
            }            
        }else {
            let posString: String = this.posList[randint(0, this.posList.length - 1)]
            return posString
        }
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
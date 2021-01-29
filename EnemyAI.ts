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

    addHitPos(x: number, y: number) {
        this.hitPosX.push(x)
        this.hitPosY.push(y)

        this.sortHitPos()
    }

    sortHitPos() {
        utility.sortNumArray(this.hitPosX)
        utility.sortNumArray(this.hitPosY)
    }
}

class Pos {
    pos: string

    evaluationValue: number

    constructor(pos: string, evaluationValue: number) {
        this.pos = pos
        this.evaluationValue = evaluationValue
    }
}

class EnemyAI {
    enemyStrategyMap: number[][] = [[],[]]

    hitShips: HitShipInfo[] = []

    posList: string[] = []

    evalutionList: Pos[] = []


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

        utility.shufflePosList<string>(this.posList)
    }

    /**
     * Record Action
     */
    public setShipInfo(shipType: ShipType, x: number, y: number) {
        this.enemyStrategyMap[x][y] = shipType

        if(ShipType.Miss != shipType) {
            if(!this.hitShips.some(s => s.shipType == shipType)) {
                let hitShip: HitShipInfo = new HitShipInfo(shipType, this.enemyStrategyMap)
                this.hitShips.push(hitShip)
            }

            let hitShip = this.hitShips.find(s => s.shipType == shipType)
            hitShip.addHitPos(x, y)
        }
        
        let posIndex = this.posList.indexOf(this.getPosString(x, y))
        this.posList.splice(posIndex, 1)

        if(this.posList.length <= 80) {
            this.removeImpossiblePos()
        }

        this.evaluationPos3()
        //if(this.attackCounter == 5) this.attackCounter = 0
    }

    evaluationPos3() {
        this.evalutionList = []

        this.posList.forEach(pos => {
            let x: number = this.getPosX(pos)
            let y: number = this.getPosY(pos)
            let value: number = 0
 
            utility.procAllPtn(x, y, 
            () => {
                //left top
                if(this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y + 1] == ShipType.Miss) {
                    value = 2
                }
                if(this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y + 1] == null) {
                    value = 1
                }

                if(value == 0) {
                    if(this.enemyStrategyMap[x][y + 1] == null) value = 1
                    if(this.enemyStrategyMap[x + 1][y] == null) value = 1
                    if(this.enemyStrategyMap[x][y + 1] != null && this.enemyStrategyMap[x][y + 1] != ShipType.Miss) value = -1
                    if(this.enemyStrategyMap[x + 1][y] != null && this.enemyStrategyMap[x + 1][y] != ShipType.Miss) value = -1
                }
            },
            () => {
                //right top  
                if(this.enemyStrategyMap[x - 1][y] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x - 1][y - 1] == ShipType.Miss) {
                    value = 2
                }
                if(this.enemyStrategyMap[x - 1][y] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x - 1][y - 1] == null) {
                    value = 1
                }

                if(value == 0) {
                    if(this.enemyStrategyMap[x][y + 1] == null) value = 1
                    if(this.enemyStrategyMap[x - 1][y] == null) value = 1
                    if(this.enemyStrategyMap[x][y + 1] != null && this.enemyStrategyMap[x][y + 1] != ShipType.Miss) value = -1
                    if(this.enemyStrategyMap[x - 1][y] != null && this.enemyStrategyMap[x - 1][y] != ShipType.Miss) value = -1
                }
            },
            () => {
                //left bottom
                if(this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == ShipType.Miss) {
                    value = 2
                }
                if(this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == null) {
                    value = 1
                }

                if(value == 0) {
                    if(this.enemyStrategyMap[x][y - 1] == null) value = 1
                    if(this.enemyStrategyMap[x + 1][y] == null) value = 1
                    if(this.enemyStrategyMap[x][y - 1] != null && this.enemyStrategyMap[x][y - 1] != ShipType.Miss) value = -1
                    if(this.enemyStrategyMap[x + 1][y] != null && this.enemyStrategyMap[x + 1][y] != ShipType.Miss) value = -1
                }
            },
            () => {
                //right bottom
                if(this.enemyStrategyMap[x - 1][y] == null
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x - 1][y - 1] == ShipType.Miss) {
                    value = 2
                }
                if(this.enemyStrategyMap[x - 1][y] == null
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x - 1][y - 1] == null) {
                    value = 3
                }

                if(value == 0) {
                    if(this.enemyStrategyMap[x][y - 1] == null) value = 1
                    if(this.enemyStrategyMap[x - 1][y] == null) value = 1
                    if(this.enemyStrategyMap[x][y - 1] != null && this.enemyStrategyMap[x][y - 1] != ShipType.Miss) value = -1
                    if(this.enemyStrategyMap[x - 1][y] != null && this.enemyStrategyMap[x - 1][y] != ShipType.Miss) value = -1
                }
            },
            () => {
                //left side
                if(this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y - 1] == ShipType.Miss
                && this.enemyStrategyMap[x + 1][y + 1] == ShipType.Miss) {
                    value = 3
                }
                if(this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y - 1] == null
                && this.enemyStrategyMap[x + 1][y + 1] == ShipType.Miss) {
                    value = 4
                }
                if(this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y - 1] == ShipType.Miss
                && this.enemyStrategyMap[x + 1][y + 1] == null) {
                    value = 5
                }

                if(value == 0) {
                    if(this.enemyStrategyMap[x][y - 1] == null && this.enemyStrategyMap[x][y + 1] == null) value = 1 
                    if(this.enemyStrategyMap[x][y - 1] != null && this.enemyStrategyMap[x][y - 1] != ShipType.Miss) value = -1
                    if(this.enemyStrategyMap[x][y + 1] != null && this.enemyStrategyMap[x][y + 1] != ShipType.Miss) value = -1
                    if(this.enemyStrategyMap[x + 1][y] != null && this.enemyStrategyMap[x + 1][y] != ShipType.Miss) value = -1
                }
            },
            () => {
                //right side
                if(this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x - 1][y] == null
                && this.enemyStrategyMap[x - 1][y - 1] == ShipType.Miss
                && this.enemyStrategyMap[x - 1][y + 1] == ShipType.Miss) {
                    value = 4
                }
                if(this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x - 1][y] == null
                && this.enemyStrategyMap[x - 1][y - 1] == null
                && this.enemyStrategyMap[x - 1][y + 1] == ShipType.Miss) {
                    value = 3
                }
                if(this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x - 1][y] == null
                && this.enemyStrategyMap[x - 1][y - 1] == ShipType.Miss
                && this.enemyStrategyMap[x - 1][y + 1] == null) {
                    value = 5
                }

                if(value == 0) {
                    if(this.enemyStrategyMap[x][y - 1] == null && this.enemyStrategyMap[x][y + 1] == null) value = 1
                    if(this.enemyStrategyMap[x][y - 1] != null && this.enemyStrategyMap[x][y - 1] != ShipType.Miss) value = -1
                    if(this.enemyStrategyMap[x][y + 1] != null && this.enemyStrategyMap[x][y + 1] != ShipType.Miss) value = -1
                    if(this.enemyStrategyMap[x - 1][y] != null && this.enemyStrategyMap[x - 1][y] != ShipType.Miss) value = -1
                }
            },
            () => {
                //top side
                if(this.enemyStrategyMap[x - 1][y] == null
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x - 1][y + 1] == ShipType.Miss
                && this.enemyStrategyMap[x + 1][y + 1] == ShipType.Miss) {
                    value = 3
                }
                if(this.enemyStrategyMap[x - 1][y] == null
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x - 1][y + 1] == null
                && this.enemyStrategyMap[x + 1][y + 1] == ShipType.Miss) {
                    value = 5
                }
                if(this.enemyStrategyMap[x - 1][y] == null
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x - 1][y + 1] == ShipType.Miss
                && this.enemyStrategyMap[x + 1][y + 1] == null) {
                    value = 4
                }

                if(value == 0) {
                    if(this.enemyStrategyMap[x - 1][y] == null && this.enemyStrategyMap[x + 1][y] == null) value = 1
                    if(this.enemyStrategyMap[x][y + 1] != null && this.enemyStrategyMap[x][y + 1] != ShipType.Miss) value = -1
                    if(this.enemyStrategyMap[x - 1][y] != null && this.enemyStrategyMap[x - 1][y] != ShipType.Miss) value = -1
                    if(this.enemyStrategyMap[x + 1][y] != null && this.enemyStrategyMap[x + 1][y] != ShipType.Miss) value = -1
                }
            },
            () => {
                //bottom side
                if(this.enemyStrategyMap[x - 1][y] == null
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x - 1][y - 1] == ShipType.Miss
                && this.enemyStrategyMap[x + 1][y - 1] == ShipType.Miss) {
                    value = 3
                }
                if(this.enemyStrategyMap[x - 1][y] == null
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x - 1][y - 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == ShipType.Miss) {
                    value = 4
                }
                if(this.enemyStrategyMap[x - 1][y] == null
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x - 1][y - 1] == ShipType.Miss
                && this.enemyStrategyMap[x + 1][y - 1] == null) {
                    value = 5
                }

                if(value == 0) {
                    if(this.enemyStrategyMap[x - 1][y] == null && this.enemyStrategyMap[x + 1][y] == null) value = 1
                    if(this.enemyStrategyMap[x][y - 1] != null && this.enemyStrategyMap[x][y - 1] != ShipType.Miss) value = -1
                    if(this.enemyStrategyMap[x - 1][y] != null && this.enemyStrategyMap[x - 1][y] != ShipType.Miss) value = -1
                    if(this.enemyStrategyMap[x + 1][y] != null && this.enemyStrategyMap[x + 1][y] != ShipType.Miss) value = -1
                }
            },
            () => {
                //inside
                if(this.enemyStrategyMap[x - 1][y - 1] == ShipType.Miss 
                && this.enemyStrategyMap[x - 1][y] == null 
                && this.enemyStrategyMap[x - 1][y + 1] == ShipType.Miss
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == null
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y + 1] == null) {
                    value = 3
                }
                if(this.enemyStrategyMap[x - 1][y - 1] == null 
                && this.enemyStrategyMap[x - 1][y] == null 
                && this.enemyStrategyMap[x - 1][y + 1] == null
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == ShipType.Miss
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y + 1] == ShipType.Miss) {
                    value = 3
                }
                if(this.enemyStrategyMap[x - 1][y - 1] == ShipType.Miss 
                && this.enemyStrategyMap[x - 1][y] == null 
                && this.enemyStrategyMap[x - 1][y + 1] == null
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == ShipType.Miss
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y + 1] == null) {
                    value = 3
                }
                if(this.enemyStrategyMap[x - 1][y - 1] == null 
                && this.enemyStrategyMap[x - 1][y] == null 
                && this.enemyStrategyMap[x - 1][y + 1] == ShipType.Miss
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == null
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y + 1] == ShipType.Miss) {
                    value = 4
                }
                if(this.enemyStrategyMap[x - 1][y - 1] == ShipType.Miss 
                && this.enemyStrategyMap[x - 1][y] == null 
                && this.enemyStrategyMap[x - 1][y + 1] == ShipType.Miss
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == ShipType.Miss
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y + 1] == ShipType.Miss) {
                    value = 2
                }
                if(this.enemyStrategyMap[x - 1][y - 1] == ShipType.Miss 
                && this.enemyStrategyMap[x - 1][y] == null 
                && this.enemyStrategyMap[x - 1][y + 1] == null
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == null
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y + 1] == null) {
                    value = 5
                }
                if(this.enemyStrategyMap[x - 1][y - 1] == null 
                && this.enemyStrategyMap[x - 1][y] == null 
                && this.enemyStrategyMap[x - 1][y + 1] == ShipType.Miss
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == null
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y + 1] == null) {
                    value = 4
                }
                if(this.enemyStrategyMap[x - 1][y - 1] == null 
                && this.enemyStrategyMap[x - 1][y] == null 
                && this.enemyStrategyMap[x - 1][y + 1] == null
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == ShipType.Miss
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y + 1] == null) {
                    value = 4
                }
                if(this.enemyStrategyMap[x - 1][y - 1] == null 
                && this.enemyStrategyMap[x - 1][y] == null 
                && this.enemyStrategyMap[x - 1][y + 1] == null
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == null
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y + 1] == ShipType.Miss) {
                    value = 4
                }
                if(this.enemyStrategyMap[x - 1][y - 1] == null 
                && this.enemyStrategyMap[x - 1][y] == null 
                && this.enemyStrategyMap[x - 1][y + 1] == null
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == null
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y + 1] == null) {
                    value = 4
                }
                if(this.enemyStrategyMap[x - 1][y - 1] == ShipType.Miss 
                && this.enemyStrategyMap[x - 1][y] == null 
                && this.enemyStrategyMap[x - 1][y + 1] == ShipType.Miss
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == ShipType.Miss
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y + 1] == null) {
                    value = 1
                }
                if(this.enemyStrategyMap[x - 1][y - 1] == ShipType.Miss 
                && this.enemyStrategyMap[x - 1][y] == null 
                && this.enemyStrategyMap[x - 1][y + 1] == ShipType.Miss
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == null
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y + 1] == ShipType.Miss) {
                    value = 1
                }
                if(this.enemyStrategyMap[x - 1][y - 1] == ShipType.Miss 
                && this.enemyStrategyMap[x - 1][y] == null 
                && this.enemyStrategyMap[x - 1][y + 1] == null
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == ShipType.Miss
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y + 1] == ShipType.Miss) {
                    value = 1
                }
                if(this.enemyStrategyMap[x - 1][y - 1] == null 
                && this.enemyStrategyMap[x - 1][y] == null 
                && this.enemyStrategyMap[x - 1][y + 1] == ShipType.Miss
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == ShipType.Miss
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y + 1] == ShipType.Miss) {
                    value = 1
                }
                if(this.enemyStrategyMap[x - 1][y - 1] == ShipType.Miss 
                && this.enemyStrategyMap[x - 1][y] == null 
                && this.enemyStrategyMap[x - 1][y + 1] == ShipType.Miss
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == null
                && this.enemyStrategyMap[x + 1][y] == ShipType.Miss
                && this.enemyStrategyMap[x + 1][y + 1] == null) {
                    value = 1
                }
                if(this.enemyStrategyMap[x - 1][y - 1] == null 
                && this.enemyStrategyMap[x - 1][y] == ShipType.Miss 
                && this.enemyStrategyMap[x - 1][y + 1] == null
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == ShipType.Miss
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y + 1] == ShipType.Miss) {
                    value = 1
                }
                if(this.enemyStrategyMap[x - 1][y - 1] == null 
                && this.enemyStrategyMap[x - 1][y] == null 
                && this.enemyStrategyMap[x - 1][y + 1] == ShipType.Miss
                && this.enemyStrategyMap[x][y - 1] == ShipType.Miss
                && this.enemyStrategyMap[x][y + 1] == null
                && this.enemyStrategyMap[x + 1][y - 1] == null
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y + 1] == ShipType.Miss) {
                    value = 1
                }
                if(this.enemyStrategyMap[x - 1][y - 1] == ShipType.Miss 
                && this.enemyStrategyMap[x - 1][y] == null 
                && this.enemyStrategyMap[x - 1][y + 1] == null
                && this.enemyStrategyMap[x][y - 1] == null
                && this.enemyStrategyMap[x][y + 1] == ShipType.Miss
                && this.enemyStrategyMap[x + 1][y - 1] == ShipType.Miss
                && this.enemyStrategyMap[x + 1][y] == null
                && this.enemyStrategyMap[x + 1][y + 1] == null) {
                    value = 1
                }

                if(value == 0) {
                    if(this.enemyStrategyMap[x - 1][y] == null 
                    && this.enemyStrategyMap[x + 1][y] == null  
                    && this.enemyStrategyMap[x - 1][y] == null 
                    && this.enemyStrategyMap[x + 1][y] == null) value = 2
                    if(this.enemyStrategyMap[x - 1][y] == null && this.enemyStrategyMap[x + 1][y] == null) value = 1
                    if(this.enemyStrategyMap[x][y - 1] == null && this.enemyStrategyMap[x][y + 1] == null) value = 1
                    if(this.enemyStrategyMap[x][y - 1] != null && this.enemyStrategyMap[x][y - 1] != ShipType.Miss) value = -1
                    if(this.enemyStrategyMap[x][y + 1] != null && this.enemyStrategyMap[x][y + 1] != ShipType.Miss) value = -1
                    if(this.enemyStrategyMap[x - 1][y] != null && this.enemyStrategyMap[x - 1][y] != ShipType.Miss) value = -1
                    if(this.enemyStrategyMap[x + 1][y] != null && this.enemyStrategyMap[x + 1][y] != ShipType.Miss) value = -1
                }
            })

            this.evalutionList.push(new Pos(pos, value))
        })
    }

    removeImpossiblePos() {
        let minShipLength: number = this.getNotFoundShipsMinLength()
        let ignorePosList: string[] = []

        this.posList.forEach(pos => {
            if(!this.existShipSpace(this.getPosX(pos), this.getPosY(pos), minShipLength)) {
                ignorePosList.push(pos)
            }
        });

        ignorePosList.forEach(pos => {
            let posIndex = this.posList.indexOf(pos)
            this.posList.splice(posIndex, 1)
        })
    }

    existShipSpace(x: number, y: number, shipLength: number): boolean {
        let xCount = this.countSpaceX(x, y) 
        let yCount = this.countSpaceY(x, y)

        if( xCount < shipLength && yCount < shipLength) {
            console.log(`[removeImpossiblePos]x:${x},y:${y},xCount:${xCount},yCount:${yCount},shipLength:${shipLength}`)
        }

        return xCount >= shipLength || yCount >= shipLength 
    }

    getNotFoundShipsMinLength(): number {
        let lengthList: number[] = []

        for(let i = 0; i < 5; i++) {
            let hitShip = this.hitShips.find(s => s.shipType == i)
            
            if(hitShip != null && hitShip.hasSunk()) continue

            lengthList.push(utility.getShipLength(i))
        }

        for(let i = lengthList.length; i >= 0; i--) {
            for(let j = 0; j < i; j++) {
                if(lengthList[j] > lengthList[j+1]) {
                    lengthList = utility.swap(lengthList, j, (j + 1))
                }
            }
        }

        return lengthList[0]
    }

    /**
     * Think Next Move
     */
    public getNextPos(): string {
        if(this.hitShips.length != null && this.hitShips.some(s => !s.hasSunk())) {
            let target: HitShipInfo = this.hitShips.find(s => !s.hasSunk())

            let minX = target.hitPosX[0];
            let maxX = target.hitPosX[target.hitPosX.length - 1]
            let minY = target.hitPosY[0];
            let maxY = target.hitPosY[target.hitPosY.length - 1]
            let nextX: number = 0
            let nextY: number = 0

            if(target.direction() == HitShipDirection.Unknown) {
                if(minX == 0 && minY == 0) {
                    //left top
                    if(this.enemyStrategyMap[minX + 1][minY] == null && this.enemyStrategyMap[minX + 2][minY] != null && this.enemyStrategyMap[minX + 2][minY] != ShipType.Miss) {
                        nextX = minX
                        nextY = minY + 1
                    }else if(this.enemyStrategyMap[minX][minY + 1] == null && this.enemyStrategyMap[minX][minY + 2] != null && this.enemyStrategyMap[minX][minY + 2] != ShipType.Miss) {
                        nextX = minX + 1
                        nextY = minY
                    }else if(this.enemyStrategyMap[minX + 1][minY] == null) {
                        nextX = minX + 1
                        nextY = minY
                    }else {
                        nextX = minX
                        nextY = minY + 1
                    }
                }else if (maxX == 9 && minY == 0) {
                    //right top
                    if(this.enemyStrategyMap[maxX - 1][minY] == null && this.enemyStrategyMap[maxX - 2][minY] != null && this.enemyStrategyMap[maxX - 2][minY] != ShipType.Miss) {
                        nextX = minX
                        nextY = minY + 1
                    }else if(this.enemyStrategyMap[maxX][minY + 1] == null && this.enemyStrategyMap[maxX][minY + 2] != null && this.enemyStrategyMap[maxX][minY + 2] != ShipType.Miss) {
                        nextX = minX - 1
                        nextY = minY
                    }else if(this.enemyStrategyMap[maxX - 1][minY] == null) {
                        nextX = minX - 1
                        nextY = minY
                    }else {
                        nextX = minX
                        nextY = minY + 1
                    }
                }else if (minX == 0 && maxY == 9) {
                    //left bottom
                    if(this.enemyStrategyMap[minX + 1][minY] == null && this.enemyStrategyMap[minX + 2][minY] != null && this.enemyStrategyMap[minX + 2][minY] != ShipType.Miss) {
                        nextX = minX
                        nextY = minY - 1
                    }else if(this.enemyStrategyMap[minX][minY - 1] == null && this.enemyStrategyMap[minX][minY - 2] != null && this.enemyStrategyMap[minX][minY - 2] != ShipType.Miss) {
                        nextX = minX + 1
                        nextY = minY
                    }else if(this.enemyStrategyMap[minX + 1][maxY] == null) {
                        nextX = minX + 1
                        nextY = maxY
                    }else {
                        nextX = minX
                        nextY = maxY - 1
                    }
                }else if (maxX == 9 && maxY == 9) {
                    //right bottom
                    if(this.enemyStrategyMap[maxX - 1][maxY] == null && this.enemyStrategyMap[maxX - 2][maxY] != null && this.enemyStrategyMap[maxX - 2][maxY] != ShipType.Miss) {
                        nextX = minX
                        nextY = minY - 1
                    }else if(this.enemyStrategyMap[maxX][minY - 1] == null && this.enemyStrategyMap[maxX][minY - 2] != null && this.enemyStrategyMap[maxX][minY - 2] != ShipType.Miss) {
                        nextX = minX - 1
                        nextY = minY
                    }else if(this.enemyStrategyMap[maxX - 1][maxY] == null) {
                        nextX = maxX - 1
                        nextY = maxY
                    }else {
                        nextX = maxX
                        nextY = maxY + 1
                    }
                }else if(minX == 0 && minY > 0 && minY < 9) {
                    //left side
                    if(this.enemyStrategyMap[minX][minY + 1] == null) {
                        nextX = minX
                        nextY = minY + 1
                    }else if(this.enemyStrategyMap[minX][minY - 1] == null) {
                        nextX = minX
                        nextY = minY - 1
                    }else {
                        nextX = minX + 1
                        nextY = minY
                    }
                }else if(minX == 9 && minY > 0 && minY < 9) {
                    //right side
                    if(this.enemyStrategyMap[minX][minY + 1] == null) {
                        nextX = minX
                        nextY = minY + 1
                    }else  if(this.enemyStrategyMap[minX][minY - 1] == null) {
                        nextX = minX
                        nextY = minY - 1
                    }else {
                        nextX = minX -1
                        nextY = minY
                    }
                }else if(minX > 0 && minX < 9 && minY == 0) {
                    //Top side
                    if(this.enemyStrategyMap[minX][minY + 1] == null) {
                        nextX = minX
                        nextY = minY + 1
                    }else  if(this.enemyStrategyMap[minX + 1][minY] == null) {
                        nextX = minX + 1
                        nextY = minY
                    }else {
                        nextX = minX - 1
                        nextY = minY
                    }
                }else if(minX > 0 && minX < 9 && minY == 9) {
                    //Bottom side
                    if(this.enemyStrategyMap[minX][minY - 1] == null) {
                        nextX = minX
                        nextY = minY - 1
                    }else  if(this.enemyStrategyMap[minX + 1][minY] == null) {
                        nextX = minX + 1
                        nextY = minY
                    }else {
                        nextX = minX - 1
                        nextY = minY
                    }
                }else {
                    //inner
                    if(minX > 0 && minX < 8
                    && this.enemyStrategyMap[minX + 1][minY] == null 
                    && this.enemyStrategyMap[minX + 2][minY] != null 
                    && this.enemyStrategyMap[minX + 2][minY] != ShipType.Miss) {
                        nextX = minX - 1
                        nextY = minY
                    }else if(minX > 1 && minX < 9
                    && this.enemyStrategyMap[minX - 1][minY] == null 
                    && this.enemyStrategyMap[minX - 2][minY] != null 
                    && this.enemyStrategyMap[minX - 2][minY] != ShipType.Miss) {
                        nextX = minX + 1
                        nextY = minY
                    }else if(minY > 0 && minY < 8
                    && this.enemyStrategyMap[minX][minY + 1] == null 
                    && this.enemyStrategyMap[minX][minY + 2] != null 
                    && this.enemyStrategyMap[minX][minY + 2] != ShipType.Miss) {
                        nextX = minX
                        nextY = minY - 1
                    }else if(minY > 1 && minY < 9
                    && this.enemyStrategyMap[minX][minY - 1] == null 
                    && this.enemyStrategyMap[minX][minY - 2] != null 
                    && this.enemyStrategyMap[minX][minY - 2] != ShipType.Miss) {
                        nextX = minX
                        nextY = minY + 1
                    }else if(this.enemyStrategyMap[minX + 1][minY] == null) {
                        nextX = minX + 1
                        nextY = minY
                    }else if(this.enemyStrategyMap[minX][minY - 1] == null) {
                        nextX = minX
                        nextY = minY - 1
                    }else if(this.enemyStrategyMap[minX - 1][minY] == null) {
                        nextX = minX - 1
                        nextY = minY
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
                if(minX > 0 && maxX < 8
                && (this.enemyStrategyMap[maxX + 2][minY] != null && this.enemyStrategyMap[maxX + 2][minY] != ShipType.Miss)) {
                    nextX = minX - 1
                    nextY = minY
                } else if(minX > 1 && maxX < 9
                && (this.enemyStrategyMap[minX - 2][minY] != null && this.enemyStrategyMap[minX - 2][minY] != ShipType.Miss)) {
                    nextX = maxX + 1
                    nextY = minY
                }else if(minX > 0 && maxX < 10) {
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
                if(minY > 1 && maxY < 8
                && (this.enemyStrategyMap[minX][maxY + 2] != null && this.enemyStrategyMap[minX][maxY + 2] != ShipType.Miss)) {
                    nextX = minX
                    nextY = minY - 1
                } else if(minY > 1 && maxY < 9 
                && (this.enemyStrategyMap[minX][minY - 2] != null && this.enemyStrategyMap[minX][minY - 2] != ShipType.Miss)) {
                    nextX = minX
                    nextY = maxY + 1
                }else if(minY > 0 && maxY < 10) {
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
            if(this.evalutionList.length == 0) {
                return this.getPosString(randint(0,4), randint(0,4))
            }else {
                let nextPos: Pos = this.evalutionList.find(p => p.evaluationValue == this.getMaxEvaluationValue())
                console.log(`${nextPos.pos}, ${nextPos.evaluationValue}`)
                return nextPos.pos
            }
        }
    }

    getMaxEvaluationValue(): number {
        let evalValue: number = 0

        this.evalutionList.forEach(pos => {
            if(pos.evaluationValue > evalValue ) {
                evalValue = pos.evaluationValue
            }
        })

        return evalValue
    }

    getPosX(posString: string): number {
        return parseInt(posString.split('_')[0]);
    }

    getPosY(posString: string): number {
        return parseInt(posString.split('_')[1]);
    }

    getPosString(x: number, y: number): string {
        return `${x}_${y}`
    }

    countSpaceX(x: number, y: number): number {
        let xSpaceCount: number = 0

        if(x == 0){
            for(let i = x + 1; i < 10; i++){
                if(this.enemyStrategyMap[i][y] == null) {
                    xSpaceCount += 1
                }else{
                    break
                }
            }
            return xSpaceCount + 1
        }else if(x == 9){
            for(let i = x - 1; i >= 0; i--){
                if(this.enemyStrategyMap[i][y] == null) {
                    xSpaceCount += 1
                }else{
                    break
                }
            }
            return xSpaceCount + 1
        }else {
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
            return xSpaceCount + 1
        }
    }

    countSpaceY(x: number, y: number): number {
        let ySpaceCount: number = 0

        if(y == 0){
            for(let i = y + 1; i < 10; i++){
                if(this.enemyStrategyMap[x][i] == null) {
                    ySpaceCount += 1
                }else{
                    break
                }
            }
            
            return ySpaceCount + 1
        }else if(y == 9){
            for(let i = y - 1; i >= 0; i--){
                if(this.enemyStrategyMap[x][i] == null) {
                    ySpaceCount += 1
                }else{
                    break
                }
            }
            
            return ySpaceCount + 1
        }else {
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
            
            return ySpaceCount + 1
        }
    }

    evaluationPos() {
        this.evalutionList = []

        this.posList.forEach(pos => {
            let x: number = this.getPosX(pos)
            let y: number = this.getPosY(pos)
            let nullCount: number = 0

            utility.procAllPtn(x, y, 
            () => {
                if(this.enemyStrategyMap[x + 1][y] == null) nullCount++
                if(this.enemyStrategyMap[x][y + 1] == null) nullCount++
                if(this.enemyStrategyMap[x + 1][y] != null && this.enemyStrategyMap[x + 1][y] != ShipType.Miss) nullCount--
                if(this.enemyStrategyMap[x][y + 1] != null && this.enemyStrategyMap[x][y + 1] != ShipType.Miss) nullCount--
            },
            () => {
                if(this.enemyStrategyMap[x - 1][y] == null) nullCount++
                if(this.enemyStrategyMap[x][y + 1] == null) nullCount++
                if(this.enemyStrategyMap[x - 1][y] != null && this.enemyStrategyMap[x - 1][y] != ShipType.Miss) nullCount--
                if(this.enemyStrategyMap[x][y + 1] != null && this.enemyStrategyMap[x][y + 1] != ShipType.Miss) nullCount--
            },
            () => {
                if(this.enemyStrategyMap[x + 1][y] == null) nullCount++
                if(this.enemyStrategyMap[x][y - 1] == null) nullCount++
                if(this.enemyStrategyMap[x + 1][y] != null && this.enemyStrategyMap[x + 1][y] != ShipType.Miss) nullCount--
                if(this.enemyStrategyMap[x][y - 1] != null && this.enemyStrategyMap[x][y - 1] != ShipType.Miss) nullCount--
            },
            () => {
                if(this.enemyStrategyMap[x - 1][y] == null) nullCount++
                if(this.enemyStrategyMap[x][y - 1] == null) nullCount++
                if(this.enemyStrategyMap[x - 1][y] != null && this.enemyStrategyMap[x - 1][y] != ShipType.Miss) nullCount--
                if(this.enemyStrategyMap[x][y - 1] != null && this.enemyStrategyMap[x][y - 1] != ShipType.Miss) nullCount--
            },
            () => {
                if(this.enemyStrategyMap[x + 1][y] == null) nullCount++
                if(this.enemyStrategyMap[x][y + 1] == null) nullCount++
                if(this.enemyStrategyMap[x][y - 1] == null) nullCount++
                if(this.enemyStrategyMap[x + 1][y] != null && this.enemyStrategyMap[x + 1][y] != ShipType.Miss) nullCount--
                if(this.enemyStrategyMap[x][y + 1] != null && this.enemyStrategyMap[x][y + 1] != ShipType.Miss) nullCount--
                if(this.enemyStrategyMap[x][y - 1] != null && this.enemyStrategyMap[x][y - 1] != ShipType.Miss) nullCount--
            },
            () => {
                if(this.enemyStrategyMap[x - 1][y] == null) nullCount++
                if(this.enemyStrategyMap[x][y + 1] == null) nullCount++
                if(this.enemyStrategyMap[x][y - 1] == null) nullCount++
                if(this.enemyStrategyMap[x - 1][y] != null && this.enemyStrategyMap[x - 1][y] != ShipType.Miss) nullCount--
                if(this.enemyStrategyMap[x][y + 1] != null && this.enemyStrategyMap[x][y + 1] != ShipType.Miss) nullCount--
                if(this.enemyStrategyMap[x][y - 1] != null && this.enemyStrategyMap[x][y - 1] != ShipType.Miss) nullCount--
            },
            () => {
                if(this.enemyStrategyMap[x][y + 1] == null) nullCount++
                if(this.enemyStrategyMap[x - 1][y] == null) nullCount++
                if(this.enemyStrategyMap[x + 1][y] == null) nullCount++
                if(this.enemyStrategyMap[x][y + 1] != null && this.enemyStrategyMap[x][y + 1] != ShipType.Miss) nullCount--
                if(this.enemyStrategyMap[x - 1][y] != null && this.enemyStrategyMap[x - 1][y] != ShipType.Miss) nullCount--
                if(this.enemyStrategyMap[x + 1][y] != null && this.enemyStrategyMap[x + 1][y] != ShipType.Miss) nullCount--
            },
            () => {
                if(this.enemyStrategyMap[x][y - 1] == null) nullCount++
                if(this.enemyStrategyMap[x - 1][y] == null) nullCount++
                if(this.enemyStrategyMap[x + 1][y] == null) nullCount++
                if(this.enemyStrategyMap[x][y - 1] != null && this.enemyStrategyMap[x][y - 1] != ShipType.Miss) nullCount--
                if(this.enemyStrategyMap[x - 1][y] != null && this.enemyStrategyMap[x - 1][y] != ShipType.Miss) nullCount--
                if(this.enemyStrategyMap[x + 1][y] != null && this.enemyStrategyMap[x + 1][y] != ShipType.Miss) nullCount--
            },
            () => {
                if(this.enemyStrategyMap[x][y - 1] == null) nullCount++
                if(this.enemyStrategyMap[x][y + 1] == null) nullCount++
                if(this.enemyStrategyMap[x - 1][y] == null) nullCount++
                if(this.enemyStrategyMap[x + 1][y] == null) nullCount++
                if(this.enemyStrategyMap[x][y - 1] != null && this.enemyStrategyMap[x][y - 1] != ShipType.Miss) nullCount--
                if(this.enemyStrategyMap[x][y + 1] != null && this.enemyStrategyMap[x][y + 1] != ShipType.Miss) nullCount--
                if(this.enemyStrategyMap[x - 1][y] != null && this.enemyStrategyMap[x - 1][y] != ShipType.Miss) nullCount--
                if(this.enemyStrategyMap[x + 1][y] != null && this.enemyStrategyMap[x + 1][y] != ShipType.Miss) nullCount--

                if(this.posList.length >= 80) {
                    if(this.enemyStrategyMap[x - 1][y - 1] == null) nullCount++
                    if(this.enemyStrategyMap[x + 1][y - 1] == null) nullCount++
                    if(this.enemyStrategyMap[x - 1][y + 1] == null) nullCount++
                    if(this.enemyStrategyMap[x + 1][y + 1] == null) nullCount++
                }
            })

            if(this.evalutionList.some(p => p.pos == pos)){
                let el: Pos = this.evalutionList.find(p => p.pos == pos)
                el.evaluationValue = nullCount
            }else{
                this.evalutionList.push(new Pos(pos, nullCount))
            }
        })
    }
}
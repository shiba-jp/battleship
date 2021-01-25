enum ShipDirection{
    Horizontal = 0,
    Vertical = 1,
}

enum ShipType {
    PatrolBoat = 0,
    Cruiser = 1,
    Submarine = 2,
    Battleship = 3,
    AircraftCarrier = 4,
    Miss = 9,
}

enum ShipOwner {
    Player = 0,
    Enemy = 1,
}

class ShipContext {

    private _shipType: ShipType

    private _derection: ShipDirection

    private _owner: ShipOwner

    private _shipSprite: Sprite

    get shipType(): ShipType {
        return this._shipType
    }

    get derection(): ShipDirection {
        return this._derection
    }

    get owner(): ShipOwner {
        return this._owner
    }

    get shipSprite(): Sprite {
        return this._shipSprite
    }

    constructor(shipType: ShipType, owner: ShipOwner, shipMap: number[][]) {
        this._shipType = shipType
        this._derection = randint(0, 1) == 0 ? ShipDirection.Horizontal : ShipDirection.Vertical
        this._owner = owner
        this.deploy(shipMap)
    }

    public destroyShipSprite() {
        if(this._shipSprite != null) {
            this._shipSprite.destroy()
        } 
    }

    private getShuffledNum(length: number): number {
        let result: number[] = []
        for(let i = 0; i < length; i++) {
            result.push(i)
        }

        utility.shufflePosList<number>(result)

        return result[randint(0, length - 1)];
        //return result[0]
    }

    private deploy(shipMap: number[][]) {
        let shipLength: number = this.getShipLength()
        let max: number = 9 - shipLength;
        let shipImage: Image = null

        let posX: number = this._derection == ShipDirection.Horizontal ? this.getShuffledNum(max + 1) : this.getShuffledNum(10)
        let posY: number = this._derection == ShipDirection.Vertical ? this.getShuffledNum(max + 1) : this.getShuffledNum(10)
        //let posX: number = randint(0, this._derection == ShipDirection.Horizontal ? max : 9)
        //let posY: number = randint(0, this._derection == ShipDirection.Vertical ? max : 9)
        let imgStartX: number = this._owner == ShipOwner.Player ? 6 : 83
        let spriteStartX: number = this._owner == ShipOwner.Player ? 8 : 86

        if(this.canDeploy(posX, posY, shipLength, shipMap)) {
            if(this._derection == ShipDirection.Horizontal) {
                for(let i = posX; i < posX + shipLength; i++) {
                    shipMap[i][posY] = this._shipType
                }

                shipImage = utility.getShipImage(this.shipType, ShipDirection.Horizontal)
            }else if(this._derection == ShipDirection.Vertical) {
                for(let j = posY; j < posY + shipLength; j++) {
                    shipMap[posX][j] = this._shipType
                }

                shipImage = utility.getShipImage(this.shipType, ShipDirection.Vertical)
            }

            if(ShipOwner.Player == this._owner) {
                if(randint(0, 1) == 1) shipImage = shipImage.rotated(180)
                scene.backgroundImage().drawTransparentImage(shipImage, imgStartX + (posX * 7), 7 + (posY * 7))
            }else {
                if(randint(0, 1) == 1) shipImage = shipImage.rotated(180)
                
                this._shipSprite = sprites.create(shipImage)
                let spriteX: number = 0
                let spriteY: number = 0
                if(this._derection == ShipDirection.Horizontal) {
                    spriteX = spriteStartX + ((posX + Math.floor(shipLength / 2)) * 7) + (shipLength % 2 == 0 ? -2 : 1)
                    spriteY = 7 + (posY * 7) + 4
                    
                }else {
                    spriteX = imgStartX + (posX * 7) + 4
                    spriteY = 10 + ((posY + Math.floor(shipLength / 2)) * 7) + (shipLength % 2 == 0 ? -2 : 1)
                }
                this._shipSprite.setPosition(spriteX, spriteY)
                this._shipSprite.setFlag(SpriteFlag.Invisible, true)
            }
        } else {
            this.deploy(shipMap)
        }
    }

    private canDeploy(posX: number, posY: number, shipLength: number, shipMap: number[][]): boolean {
        let canPlace = true

        if(this._derection == ShipDirection.Horizontal) {
            for(let i = posX; i < posX + shipLength; i++) {
                //船の領域内に既に他の船がある場合はダメ
                if(shipMap[i][posY] != null) {
                    canPlace = false
                    break
                }

                //行が隣り合っている場合はダメ
                if(posY == 0 && shipMap[i][posY + 1] != null) {
                    canPlace = false
                    break
                }
                if(posY == 9 && shipMap[i][posY - 1] != null) {
                    canPlace = false
                    break
                }
                if(posY > 1 && posY < 8 && (shipMap[i][posY - 2] != null || shipMap[i][posY + 2] != null)) {
                    canPlace = false
                    break
                }
                if(posY > 0 && posY < 9 && (shipMap[i][posY - 1] != null || shipMap[i][posY + 1] != null)) {
                    canPlace = false
                    break
                }
            }
            // 列が隣り合っている場合はダメ
            if(posX == 0 && shipMap[posX + shipLength][posY] != null) {
                canPlace = false
            }
            if(posX + shipLength - 1 == 9 && shipMap[posX - 1][posY] != null) {
                canPlace = false
            }
            if(posX > 0 && posX + shipLength - 1 < 9 && (shipMap[posX - 1][posY] != null 
            || shipMap[posX + shipLength][posY] != null)) {
                canPlace = false
            }

            if(posY >= 0 && posY < 9) {
                if(posX == 0 && shipMap[posX + shipLength][posY + 1] != null) {
                    canPlace = false
                }
                if(posX + shipLength - 1 == 9 && shipMap[posX - 1][posY + 1] != null) {
                    canPlace = false
                }
                if(posX > 0 && posX + shipLength - 1 < 9 && (shipMap[posX - 1][posY + 1] != null 
                || shipMap[posX + shipLength][posY + 1] != null)) {
                    canPlace = false
                }
            }
            if(posY > 0 && posY <= 9) {
                if(posX == 0 && shipMap[posX + shipLength][posY - 1] != null) {
                    canPlace = false
                }
                if(posX == 0 && shipMap[posX + shipLength][posY - 1] != null) {
                    canPlace = false
                }
                if(posX + shipLength - 1 == 9 && shipMap[posX - 1][posY - 1] != null) {
                    canPlace = false
                }
                if(posX > 0 && posX + shipLength - 1 < 9 && (shipMap[posX - 1][posY - 1] != null 
                || shipMap[posX + shipLength][posY + 1] != null)) {
                    canPlace = false
                }
            }
        }else if(this._derection == ShipDirection.Vertical) {
            for(let j = posY; j < posY + shipLength; j++) {
                //船の領域内に既に他の船がある場合はダメ
                if(shipMap[posX][j] != null) {
                    canPlace = false
                    break
                }

                //行が隣り合っている場合はダメ
                if(posX == 0 && shipMap[posX + 1][j] != null) {
                    canPlace = false
                    break
                }
                if(posX == 9 && shipMap[posX - 1][j] != null) {
                    canPlace = false
                    break
                }
                if(posX > 1 && posX < 8 && (shipMap[posX - 2][j] != null || shipMap[posX + 2][j] != null)) {
                    canPlace = false
                    break
                }
                if(posX > 0 && posX < 9 && (shipMap[posX - 1][j] != null || shipMap[posX + 1][j] != null)) {
                    canPlace = false
                    break
                }
            }

            // 列が隣り合っている場合はダメ
            if(posY == 0 && shipMap[posX][posY + shipLength] != null) {
                canPlace = false
            }
            if(posY + shipLength - 1 == 9 && shipMap[posX][posY - 1] != null) {
                canPlace = false
            }
            if(posY > 0 && posY + shipLength - 1 < 9 && (shipMap[posX][posY - 1] != null 
            || shipMap[posX][posY + shipLength] != null)) {
                canPlace = false
            }
            if(posX >= 0 && posX < 9) {
                if(posY == 0 && shipMap[posX + 1][posY + shipLength] != null) {
                    canPlace = false
                }
                if(posY + shipLength - 1 == 9 && shipMap[posX + 1][posY - 1] != null) {
                    canPlace = false
                }
                if(posY > 0 && posY + shipLength - 1 < 9 && (shipMap[posX + 1][posY - 1] != null 
                || shipMap[posX + 1][posY + shipLength] != null)) {
                    canPlace = false
                }
            }
            if(posX > 0 && posX <= 9) {
                if(posY == 0 && shipMap[posX - 1][posY + shipLength] != null) {
                    canPlace = false
                }
                if(posY + shipLength - 1 == 9 && shipMap[posX - 1][posY - 1] != null) {
                    canPlace = false
                }
                if(posY > 0 && posY + shipLength - 1 < 9 && (shipMap[posX - 1][posY - 1] != null 
                || shipMap[posX - 1][posY + shipLength] != null)) {
                    canPlace = false
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


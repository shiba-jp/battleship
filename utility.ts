namespace utility {
    export function drawImage(img: Image, x: number, y: number) {
        backGround.MAIN_SCREEN.drawTransparentImage(img, x, y)
    }

    export function initilaizeMap(map: number[][]) {
        for(let i = 0; i < 10; i++) {
            map[i] = []
            for(let j = 0; j < 10;j ++) {
                map[i][j] = null
            }
        }
    }

    export function consoleMapLog(map: number[][], name: String) {
        console.log("----------------------------------------")
        console.log(name)
        console.log("----------------------------------------")
        for(let i = 0; i < 10; i++){
            let logLine: string = ""
            
            for(let j = 0; j < 10; j++) {
                let val = ""
                if(map[j][i] != null){
                    val = map[j][i].toString()
                }else{
                    val = "null"
                }
                logLine = logLine + val + ","
            }
            console.logValue("Row" + i, logLine)
        }
        console.log("----------------------------------------")
    }

    export function getShipLength(shipType: ShipType): number {
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

    export function getShipImage(shipType: ShipType, direction: ShipDirection): Image {
        let image: Image = null

        if(ShipDirection.Horizontal == direction) {
            switch(shipType) {
                case ShipType.PatrolBoat:
                    image = (new BattleshipImages.Ship).PATROL_BOAT_H
                    break
                case ShipType.Cruiser:
                    image = (new BattleshipImages.Ship).CRUISER_H
                    break
                case ShipType.Submarine:
                    image = (new BattleshipImages.Ship).SUBMARINE_H
                    break
                case ShipType.Battleship:
                    image = (new BattleshipImages.Ship).BATTLESHIP_H
                    break
                case ShipType.AircraftCarrier:
                    image = (new BattleshipImages.Ship).AIRCRAFT_CARRIER_H
                    break
            }
        }else {
            switch(shipType) {
                case ShipType.PatrolBoat:
                    image = (new BattleshipImages.Ship).PATROL_BOAT_V
                    break
                case ShipType.Cruiser:
                    image = (new BattleshipImages.Ship).CRUISER_V
                    break
                case ShipType.Submarine:
                    image = (new BattleshipImages.Ship).SUBMARINE_V
                    break
                case ShipType.Battleship:
                    image = (new BattleshipImages.Ship).BATTLESHIP_V
                    break
                case ShipType.AircraftCarrier:
                    image = (new BattleshipImages.Ship).AIRCRAFT_CARRIER_V
                    break
            }
        }
        

        return image
    }

    export function sortNumArray(arr: number[]) {
        for(let i = arr.length; i >= 0; i--) {
            for(let j = 0; j < i; j++) {
                if(arr[j] > arr[j+1]) {
                    arr = utility.swap(arr, j, (j + 1))
                }
            }
        }
    }

    export function swap(arr: number[], i:number, j:number){
        arr[i] = [arr[j], arr[j] = arr[i]][0];
        return arr;
    }

    export function shufflePosList<T>(arr: T[]) {
        for (let i = arr.length; 1 < i; i--) {
            let k = Math.floor(Math.random() * i);
            [arr[k], arr[i - 1]] = [arr[i - 1], arr[k]];
        }
    }

    export function procAllPtn(x: number, y: number, 
            leftTop: Action, rightTop: Action, leftBottom: Action, rightBottom: Action,
            leftSide: Action, rightSide: Action, topSide: Action, bottomSide: Action,
            inSide: Action) {

        if(x == 0 && y == 0) {
            leftTop()
        }
        if(x == 9 && y == 0) {
            rightTop()
        }
        if(x == 0 && y == 9) {
            leftBottom()
        }
        if(x == 9 && y == 9) {
            rightBottom()
        }
        if(x == 0 && (y > 0 && y < 9)) {
            leftSide()
        }
        if(x == 9 && (y > 0 && y < 9)) {
            rightSide()
        }
        if((x > 0 && x < 9) && y ==0) {
            topSide()
        }
        if((x > 0 && x < 9) && y ==9) {
            bottomSide()
        }
        if((x > 0 && x < 9) && (y > 0 && y < 9)) {
            inSide()
        }
    }
}

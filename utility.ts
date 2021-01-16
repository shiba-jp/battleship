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
}

const table = document.querySelector("#tabla")

const left1 = document.querySelector("#balgomb1")
const right1 = document.querySelector("#jobbgomb1")
const left3 = document.querySelector("#balgomb3")
const right3 = document.querySelector("#jobbgomb3")
const left5 = document.querySelector("#balgomb5")
const rigth5 = document.querySelector("#jobbgomb5")


const up1 = document.querySelector("#fel1")
const down1 = document.querySelector("#le1")
const up3 = document.querySelector("#fel3")
const down3 = document.querySelector("#le3")
const up5 = document.querySelector("#fel5")
const down5 = document.querySelector("#le5")


const plusTile = document.querySelector("#pluszelem")
const dataSheet = document.querySelector("#adatlap")
const endOfRound = document.querySelector("#korvege")


const startBtn = document.querySelector("#ujjatek")
const numOfPlayers = document.querySelector("#jatekosokszama")
const numOfCoin = document.querySelector("#kincsekszama")
const playArea = document.querySelector("#jatekter")
const spanPlayer = document.querySelector("#jatekosspan")
const spanCoin = document.querySelector("#kincsspan")
const winnerText = document.querySelector("#gyozteskiiras")

const rulesBtn = document.querySelector("#jatekszabgomb")
const rulesDiv = document.querySelector("#jatekszabdiv");
const rulesClose = document.querySelector("#jatekszabbezar")


let playerNum = 444
let coin = 222


numOfPlayers.addEventListener("input", spanJ)
function spanJ(params) {
    spanPlayer.innerHTML = numOfPlayers.value
}

numOfCoin.addEventListener("input", spanC)
function spanC(params) {
    spanCoin.innerHTML = numOfCoin.value
}


rulesBtn.addEventListener("click", rule)

function rule(params) {
    rulesDiv.style.display = 'block';
}


rulesClose.addEventListener("click", ruleCl)

function ruleCl(params) {
    rulesDiv.style.display = 'none';
}


startBtn.addEventListener("click", load)
function load(params) {
    startBtn.parentElement.style.display = "none"
    table.style.display = "block"
    playArea.style.display = "block"
    playerNum = numOfPlayers.value
    coin = parseInt(numOfCoin.value)


    let turn = 15
    let line = 13
    let intersection = 6

    class Pawn {

        constructor(x, y, color, coinNum, pic, startX, startY, coinCode) {
            this.x = x;
            this.y = y
            this.color = color;
            this.coinNum = coinNum;
            this.pic = pic
            this.startX = startX
            this.startY = startY
            this.coinCode = coinCode
        }
    }

    class Coin {

        constructor(color, x, y, pic) {
            this.color = color;
            this.x = x;
            this.y = y;
            this.pic = pic
        }
    }

    let matrix = []
    let coinNum = playerNum * coin
    let turnsNum = 0;
    let pawns = []

    pawns[0] = new Pawn(0, 0, "piros", 0, "piros.png", 0, 0, 0)
    pawns[1] = new Pawn(6, 0, "kek", 0, "kek.png", 6, 0, 1)
    pawns[2] = new Pawn(0, 6, "zold", 0, "zold.png", 0, 6, 2)
    pawns[3] = new Pawn(6, 6, "sarga", 0, "sarga.png", 6, 6, 3)
    let actualPawn = pawns[turnsNum % playerNum]

    for (let i = 0; i < 7; i++) {
        const row = []
        for (let j = 0; j < 7; j++) {
            if (i % 2 == 0 && j % 2 == 0)
                row.push(0)
            else {
                while (turn + line + intersection > 1) {
                    let x = Math.floor(Math.random() * 3) + 1;
                    if (x == 1 && turn > 0) {
                        row.push(x * 10 + Math.floor(Math.random() * 4) + 1)
                        turn--;
                        break
                    }
                    if (x == 2 && line > 0) {
                        row.push(x * 10 + Math.floor(Math.random() * 4) + 1)
                        line--;
                        break
                    }
                    if (x == 3 && intersection > 0) {
                        row.push(x * 10 + Math.floor(Math.random() * 4) + 1);
                        intersection--;
                        break
                    }
                }

            }

        }
        matrix.push(row)
    }

    matrix[0][0] = 13;
    matrix[2][0] = 33;
    matrix[4][0] = 33;
    matrix[6][0] = 12;

    matrix[0][2] = 34;
    matrix[2][2] = 33;
    matrix[4][2] = 32;
    matrix[6][2] = 32;

    matrix[0][4] = 34;
    matrix[2][4] = 34;
    matrix[4][4] = 31;
    matrix[6][4] = 32;

    matrix[0][6] = 14;
    matrix[2][6] = 31;
    matrix[4][6] = 31;
    matrix[6][6] = 11;


    for (let i = 0; i < playerNum; i++) {
        matrix[pawns[i].y][pawns[i].x] += 100
    }


    let red = coin
    let blue = coin
    let green = coin
    let yellow = coin

    function randCoin(x, y) {
        while (true) {

            let rand = Math.floor(Math.random() * playerNum);
            switch (rand) {
                case 0:
                    if (red > 0) {
                        red--
                        coinsArr[rand * coin + red] = new Coin("piros", x, y, "coinpiros.png");
                        return
                    } else {

                        continue
                    }
                case 1:
                    if (blue > 0) {
                        blue--
                        coinsArr[rand * coin + blue] = new Coin("kek", x, y, "coinkek.png");
                        return
                    } else {
                        continue
                    }
                case 2:
                    if (green > 0) {
                        green--
                        coinsArr[rand * coin + green] = new Coin("zold", x, y, "coinzold.png");
                        return
                    }
                    else {
                        continue
                    }

                case 3:
                    if (yellow > 0) {
                        yellow--
                        coinsArr[rand * coin + yellow] = new Coin("sarga", x, y, "coinsarga.png");
                        return
                    } else {
                        continue
                    }
                default:
                    break
            }
        }
    }

    function arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    let coinSv = coinNum
    let kd = [[0, 0], [0, 6], [6, 0], [6, 6]]
    let coinsArr = []
    while (coinSv != 0) {
        let y = Math.floor(Math.random() * 7);
        let x = Math.floor(Math.random() * 7);
        let tuple = [x, y]
        let isTrue = true
        for (kds of kd) {
            if (arrayEquals(kds, tuple)) {
                isTrue = false;
            }
        }
        if (isTrue) {
            matrix[x][y] *= -1
            coinSv--;
            randCoin(x, y)
            kd.push(tuple)
        }
    }


    let plusT = 0

    if (line > 0) {
        let x = 20 + Math.floor(Math.random() * 4) + 1
        plusTile.innerHTML = `<img style="transform: rotate(${((x % 10) - 1) * 90}deg);" src=${Math.trunc(x / 10) * 10}.png>`
        plusT = x;
    }
    if (turn > 0) {
        let x = 10 + Math.floor(Math.random() * 4) + 1
        plusTile.innerHTML = `<img style="transform: rotate(${((x % 10) - 1) * 90}deg);" src=${Math.trunc(x / 10) * 10}.png>`
        plusT = x;
    }
    if (intersection > 0) {
        let x = 30 + Math.floor(Math.random() * 4) + 1
        plusTile.innerHTML = `<img style="transform: rotate(${((x % 10) - 1) * 90}deg);" src=${Math.trunc(x / 10) * 10}.png>`
        plusT = x;
    }


    plusTile.addEventListener("contextmenu", plusTRotate)
    function plusTRotate(e) {
        e.preventDefault()

        if (plusT < 0) {
            plusT *= -1;
            plusT = plusT % 100
            let sv = ((Math.trunc(plusT % 10)) % 4) + 1
            plusT = (Math.trunc(plusT / 10) * 10) + sv;

            for (kincsk of coinsArr) {
                if (kincsk.y == 100 || kincsk.x == 100) {
                    plusTile.innerHTML = `<img style="transform: rotate(${((plusT % 10) - 1) * 90}deg);" src=${Math.trunc(plusT / 10) * 10}.png>
                               <img id="kincs" src=${kincsk.pic}>`
                }
            }
            plusT *= -1;
        }
        else {
            plusT = plusT % 100
            let sv = ((Math.trunc(plusT % 10)) % 4) + 1
            plusT = (Math.trunc(plusT / 10) * 10) + sv;
            plusTile.innerHTML = `<img style="transform: rotate(${((plusT % 10) - 1) * 90}deg);" src=${Math.trunc(plusT / 10) * 10}.png>`
        }
    }


    function drawTable() {
        let text = `<table style=" margin: auto;">`
        for (let i = 0; i < 7; i++) {
            text += "<tr>"
            for (let j = 0; j < 7; j++) {
                if (matrix[i][j] > 100) {

                    let sv = Math.abs(matrix[i][j] % 100);
                    text += `<td><img src=${Math.trunc(sv / 10) * 10}.png  style="transform: rotate(${((sv % 10) - 1) * 90}deg);">`
                    for (let k = 0; k < playerNum; k++)
                        if (pawns[k].x == j && pawns[k].y == i) {

                            text += ` <img id="${pawns[k].color}" src=${pawns[k].pic}>`
                        }
                    text += `</td>`

                }
                else if (matrix[i][j] < -100) {

                    let sv = Math.abs(matrix[i][j] % 100);
                    text += `<td><img src=${Math.trunc(sv / 10) * 10}.png  style="transform: rotate(${((sv % 10) - 1) * 90}deg);">`
                    for (let k = 0; k < playerNum; k++)
                        if (pawns[k].x == j && pawns[k].y == i) {
                            text += `<img  id="${pawns[k].color}" src=${pawns[k].pic}>`
                        }
                    for (let k = 0; k < coinsArr.length; k++)
                        for (let h = 0; h < playerNum; h++)
                            if (coinsArr[k].x == i && coinsArr[k].y == j && (k == parseInt(parseInt(pawns[h].coinCode) * parseInt(coin) + parseInt(pawns[h].coinNum))) && coinsArr[k].color == pawns[h].color) {
                                text += ` <img id="kincs" src=${coinsArr[k].pic}>`
                            }
                    text += `</td>`

                }

                else if (matrix[i][j] < 0) {

                    text += `<td><img src=${Math.abs(Math.trunc(Math.abs(matrix[i][j]) / 10) * 10)}.png  style="transform: rotate(${Math.abs(((Math.abs(matrix[i][j]) % 10) - 1) * 90)}deg);">`

                    for (let k = 0; k < coinsArr.length; k++)
                        for (let h = 0; h < playerNum; h++)
                            if (coinsArr[k].x == i && coinsArr[k].y == j && (k == parseInt(parseInt(pawns[h].coinCode) * parseInt(coin) + parseInt(pawns[h].coinNum))) && coinsArr[k].color == pawns[h].color) {
                                text += ` <img id="kincs" src=${coinsArr[k].pic}>`
                            }

                    text += `</td>`
                }
                else {
                    text += `<td><img src=${Math.trunc(matrix[i][j] / 10) * 10}.png  style="transform: rotate(${((matrix[i][j] % 10) - 1) * 90}deg);"></td>`
                }
            }
            text += "</tr>"
        }
        text += "</table>"
        return text
    }
    table.innerHTML = drawTable()


    function disableBtn() {
        right1.disabled = true
        right3.disabled = true
        rigth5.disabled = true
        left1.disabled = true
        left3.disabled = true
        left5.disabled = true
        down1.disabled = true
        down3.disabled = true
        down5.disabled = true
        up1.disabled = true
        up3.disabled = true
        up5.disabled = true
    }

    function enableBtn() {
        right1.disabled = false
        right3.disabled = false
        rigth5.disabled = false
        left1.disabled = false
        left3.disabled = false
        left5.disabled = false
        down1.disabled = false
        down3.disabled = false
        down5.disabled = false
        up1.disabled = false
        up3.disabled = false
        up5.disabled = false
        if (typeof stillDisable != "undefined") {
            stillDisable.disabled = true
        }
    }


    let stillDisable
   
    left1.addEventListener("click", () => {
        left(1, right1);
    });
    left3.addEventListener("click", () => {
        left(3, right3);
    });
    left5.addEventListener("click", () => {
        left(5, rigth5);
    });
    function left(x, e) {

        for (babu of pawns)
            if (babu.y == x) {
                babu.x--;
                if (babu.x < 0) {
                    babu.x = 6
                }

            }


        for (kincsk of coinsArr) {
            if (kincsk.x == x) {
                kincsk.x = x;
                kincsk.y--;
                if (kincsk.y == 99) {
                    kincsk.y = 6;
                }
                else if (kincsk.y < 0) {
                    kincsk.y = 100
                }

            }
            else if (kincsk.x == 100 || kincsk.y == 100) {
                kincsk.y = 6;
                kincsk.x = x;
            }
        }
        let sv = plusT
        plusT = matrix[x][0]

        for (let i = 0; i < matrix[x].length - 1; i++) {
            matrix[x][i] = matrix[x][i + 1];
        }
        if (Math.abs(plusT) > 100) {
            if (sv < 0) {
                matrix[x][matrix[0].length - 1] = sv + -1 * Math.trunc(Math.abs(plusT) / 100) * 100;
                plusT = plusT % 100;
            }
            else {
                matrix[x][matrix[0].length - 1] = sv + Math.trunc(Math.abs(plusT) / 100) * 100;
                plusT = plusT % 100;
            }
        }

        else {
            console.log("balra es plusz kisebb mint 100 sv:" + sv);
            matrix[x][matrix[0].length - 1] = sv;
        }
        table.innerHTML = drawTable()
        if (plusT < 0) {
            let valt = false
            for (let k = 0; k < coinsArr.length; k++)
                for (let h = 0; h < playerNum; h++)
                    if (coinsArr[k].y == 100 && coinsArr[k].x == x && (k == parseInt(parseInt(pawns[h].coinCode) * parseInt(coin) + parseInt(pawns[h].coinNum)))) {
                        plusTile.innerHTML = `<img style="transform: rotate(${((Math.abs(plusT % 100) % 10) - 1) * 90}deg);" src=${Math.trunc(Math.abs(plusT % 100) / 10) * 10}.png> 
                                <img id="kincs" src=${coinsArr[k].pic}>`
                        valt = true
                    }
                    else if (!valt) {
                        plusTile.innerHTML = `<img style="transform: rotate(${((plusT % 10) - 1) * 90}deg);" src=${Math.trunc(Math.abs(plusT) / 10) * 10}.png>`
                    }
        } else {
            plusTile.innerHTML = `<img style="transform: rotate(${((plusT % 10) - 1) * 90}deg);" src=${Math.trunc(plusT / 10) * 10}.png>`
        }

        disableBtn()
        stillDisable = e
        refreshDataSheet(possibleMoves())
    }


    right1.addEventListener("click", () => {
        right(1, left1);
    });
    right3.addEventListener("click", () => {
        right(3, left3);
    });
    rigth5.addEventListener("click", () => {
        right(5, left5);
    });
    function right(x, e) {

        for (babu of pawns)
            if (babu.y == x) {
                babu.x++;
                if (babu.x > 6) {
                    babu.x = 0
                }
            }
        for (kincsk of coinsArr)
            if (kincsk.x == x) {
                kincsk.y++;
                if (kincsk.y == 101) {
                    kincsk.y = 0;
                }
                else if (kincsk.y > 6) {
                    kincsk.y = 100
                }
            }
            else if (kincsk.x == 100 || kincsk.y == 100) {
                kincsk.y = 0;
                kincsk.x = x;
            }

        let sv = plusT
        plusT = matrix[x][matrix[0].length - 1]
        for (let i = [matrix[0].length - 1]; i > 0; i--) {
            matrix[x][i] = matrix[x][i - 1];
        }

        if (Math.abs(plusT) > 100) {
            if (sv < 0) {
                matrix[x][0] = sv + -1 * Math.trunc(Math.abs(plusT) / 100) * 100;
                plusT = plusT % 100;
            }
            else {
                matrix[x][0] = sv + Math.trunc(Math.abs(plusT) / 100) * 100;
                plusT = plusT % 100;
            }
        }
        else {
            matrix[x][0] = sv;
        }
        table.innerHTML = drawTable()
        if (plusT < 0) {
            let valt = false
            for (let k = 0; k < coinsArr.length; k++)
                for (let h = 0; h < playerNum; h++)
                    if (coinsArr[k].y == 100 && coinsArr[k].x == x && (k == parseInt(parseInt(pawns[h].coinCode) * parseInt(coin) + parseInt(pawns[h].coinNum)))) {
                        plusTile.innerHTML = `<img style="transform: rotate(${((Math.abs(plusT % 100) % 10) - 1) * 90}deg);" src=${Math.trunc(Math.abs(plusT % 100) / 10) * 10}.png> 
                                <img id="kincs" src=${coinsArr[k].pic}>`
                        valt = true
                    }
                    else if (!valt) {

                        plusTile.innerHTML = `<img style="transform: rotate(${((plusT % 10) - 1) * 90}deg);" src=${Math.trunc(Math.abs(plusT) / 10) * 10}.png>`
                    }

        } else {
            plusTile.innerHTML = `<img style="transform: rotate(${((plusT % 10) - 1) * 90}deg);" src=${Math.trunc(plusT / 10) * 10}.png>`
        }
        disableBtn()
        stillDisable = e
        refreshDataSheet(possibleMoves())
    }

    down1.addEventListener("click", () => {
        down(1, up1);
    });
    down5.addEventListener("click", () => {
        down(5, up5);
    });
    down3.addEventListener("click", () => {
        down(3, up3);
    });

    function down(x, e) {

        for (babu of pawns)
            if (babu.x == x) {
                babu.y++;
                if (babu.y > 6) {
                    babu.y = 0
                }
            }
        for (kincsk of coinsArr)
            if (kincsk.y == x) {
                kincsk.x++;
                if (kincsk.x == 101) {
                    kincsk.x = 0;
                }
                else if (kincsk.x > 6) {
                    kincsk.x = 100
                }

            }
            else if (kincsk.x == 100 || kincsk.y == 100) {
                kincsk.x = 0;
                kincsk.y = x;
            }
        let sv = plusT
        plusT = matrix[matrix[0].length - 1][x];
        for (let i = [matrix[0].length - 1]; i > 0; i--) {
            matrix[i][x] = matrix[i - 1][x];
        }

        if (Math.abs(plusT) > 100) {
            if (sv < 0) {
                matrix[0][x] = sv + -1 * Math.trunc(Math.abs(plusT) / 100) * 100;
                plusT = plusT % 100;
            }
            else {
                matrix[0][x] = sv + Math.trunc(Math.abs(plusT) / 100) * 100;
                plusT = plusT % 100;
            }
        }
        else {
            matrix[0][x] = sv;
        }
        table.innerHTML = drawTable()
        if (plusT < 0) {
            let valt = false
            for (let k = 0; k < coinsArr.length; k++)
                for (let h = 0; h < playerNum; h++)
                    if (coinsArr[k].x == 100 && coinsArr[k].y == x && (k == parseInt(parseInt(pawns[h].coinCode) * parseInt(coin) + parseInt(pawns[h].coinNum)))) {
                        plusTile.innerHTML = `<img style="transform: rotate(${((Math.abs(plusT % 100) % 10) - 1) * 90}deg);" src=${Math.trunc(Math.abs(plusT % 100) / 10) * 10}.png> 
                                               <img id="kincs" src=${coinsArr[k].pic}>`
                        valt = true
                    }
                    else if (!valt) {

                        plusTile.innerHTML = `<img style="transform: rotate(${((plusT % 10) - 1) * 90}deg);" src=${Math.trunc(Math.abs(plusT) / 10) * 10}.png>`
                    }

        } else {
            plusTile.innerHTML = `<img style="transform: rotate(${((plusT % 10) - 1) * 90}deg);" src=${Math.trunc(plusT / 10) * 10}.png>`
        }

        disableBtn()
        stillDisable = e
        refreshDataSheet(possibleMoves())

    }


    up1.addEventListener("click", () => {
        up(1, down1);
    });
    up5.addEventListener("click", () => {
        up(5, down5);
    });
    up3.addEventListener("click", () => {
        up(3, down3);
    });
    function up(x, e) {
        for (babu of pawns)
            if (babu.x == x) {
                babu.y--;
                if (babu.y < 0) {
                    babu.y = 6
                }
            }
        for (kincsk of coinsArr)
            if (kincsk.y == x) {
                kincsk.x--
                if (kincsk.x == 99) {
                    kincsk.x = 6;
                }
                else if (kincsk.x < 0) {
                    kincsk.x = 100
                }
            }
            else if (kincsk.x == 100 || kincsk.y == 100) {
                kincsk.x = 6;
                kincsk.y = x;
            }
        let sv = plusT
        plusT = matrix[0][x];
        for (let i = 0; i < [matrix[0].length - 1]; i++) {
            matrix[i][x] = matrix[i + 1][x];
        }
        if (Math.abs(plusT) > 100) {
            if (sv < 0) {
                matrix[matrix[0].length - 1][x] = sv + -1 * Math.trunc(Math.abs(plusT) / 100) * 100;
                plusT = plusT % 100;
            }
            else {
                matrix[matrix[0].length - 1][x] = sv + Math.trunc(Math.abs(plusT) / 100) * 100;
                plusT = plusT % 100;
            }
        }
        else {
            matrix[matrix[0].length - 1][x] = sv;
        }
        table.innerHTML = drawTable()
        if (plusT < 0) {
            let x = false
            for (let k = 0; k < coinsArr.length; k++)
                for (let h = 0; h < playerNum; h++)
                    if (coinsArr[k].x == 100 && coinsArr[k].y == x && (k == parseInt(parseInt(pawns[h].coinCode) * parseInt(coin) + parseInt(pawns[h].coinNum)))) {
                        plusTile.innerHTML = `<img style="transform: rotate(${((Math.abs(plusT % 100) % 10) - 1) * 90}deg);" src=${Math.trunc(Math.abs(plusT % 100) / 10) * 10}.png> 
                                               <img id="kincs" src=${coinsArr[k].pic}>`
                        x = true
                    }
                    else if (!x) {
                        plusTile.innerHTML = `<img style="transform: rotate(${((plusT % 10) - 1) * 90}deg);" src=${Math.trunc(Math.abs(plusT) / 10) * 10}.png>`
                    }

        } else {
            plusTile.innerHTML = `<img style="transform: rotate(${((plusT % 10) - 1) * 90}deg);" src=${Math.trunc(plusT / 10) * 10}.png>`
        }
        disableBtn()
        stillDisable = e
        refreshDataSheet(possibleMoves())
    }

    function xyCoord(td) {
        const tr = td.parentNode
        return {
            x: td.cellIndex,
            y: tr.sectionRowIndex
        }
    }


    function winner(params) {
        for (babu of pawns) {
            if (babu.coinNum == coin && babu.x == babu.startX && babu.y == babu.startY) {
                winnerText.innerHTML = `A ${babu.szin} játékos győzött <br>`
                startBtn.parentElement.style.display = "block"
                table.style.display = "none"
                playArea.style.display = "none"

                return
            }
        }
    }

    function possibleMoves() {
        let text = `<ul>`;
        if (actualPawn.y - 1 >= 0) {
            let mAkt = Math.abs(matrix[actualPawn.y][actualPawn.x])
            if (mAkt % 100 == 11 || mAkt % 100 == 12 || mAkt % 100 == 22 || mAkt % 100 == 24 || mAkt % 100 == 31 || mAkt % 100 == 32 || mAkt % 100 == 33) {
                let mXY = Math.abs(matrix[actualPawn.y - 1][actualPawn.x] % 100)
                if (mXY == 13 || mXY == 14 || mXY == 22 || mXY == 24 || mXY == 31 || mXY == 33 || mXY == 34) {
                    text += `<li>felfelé</li>`
                }
            }
        }
        if (actualPawn.y + 1 <= 6) {
            let mAkt = Math.abs(matrix[actualPawn.y][actualPawn.x])
            if (mAkt % 100 == 14 || mAkt % 100 == 13 || mAkt % 100 == 22 || mAkt % 100 == 24 || mAkt % 100 == 31 || mAkt % 100 == 33 || mAkt % 100 == 34) {
                let mXY = Math.abs(matrix[actualPawn.y + 1][actualPawn.x] % 100)
                if (mXY == 12 || mXY == 11 || mXY == 22 || mXY == 24 || mXY == 31 || mXY == 32 || mXY == 33) {
                    text += `<li>lefelé</li>`
                }
            }
        }
        if (actualPawn.x - 1 >= 0) {
            let mAkt = Math.abs(matrix[actualPawn.y][actualPawn.x])
            if (mAkt % 100 == 11 || mAkt % 100 == 14 || mAkt % 100 == 21 || mAkt % 100 == 23 || mAkt % 100 == 31 || mAkt % 100 == 32 || mAkt % 100 == 34) {
                let mXY = Math.abs(matrix[actualPawn.y][actualPawn.x - 1] % 100)
                if (mXY == 12 || mXY == 13 || mXY == 21 || mXY == 23 || mXY == 32 || mXY == 33 || mXY == 34) {
                    text += `<li>balra</li>`
                }
            }
        }
        if (actualPawn.x + 1 <= 6) {
            let mAkt = Math.abs(matrix[actualPawn.y][actualPawn.x])
            if (mAkt % 100 == 12 || mAkt % 100 == 13 || mAkt % 100 == 21 || mAkt % 100 == 23 || mAkt % 100 == 33 || mAkt % 100 == 32 || mAkt % 100 == 34) {
                let mXY = Math.abs(matrix[actualPawn.y][actualPawn.x + 1] % 100)
                if (mXY == 11 || mXY == 14 || mXY == 21 || mXY == 23 || mXY == 31 || mXY == 32 || mXY == 34) {
                    text += `<li>jobbra</li>`
                }
            }
        }
        text += `</ul>`
        return text
    }

    function refreshDataSheet(szov) {
        dataSheet.innerHTML = `<p>&nbsp&nbsp&nbsp&nbsp Aktuális játékos: ${actualPawn.color}</p>
                             <p>&nbsp&nbsp&nbsp&nbsp Megtalált kincsei: ${actualPawn.coinNum}</p> 
                             <p>&nbsp&nbsp&nbsp&nbsp Összes kincs: ${coin}</p>
                             <p>&nbsp&nbsp&nbsp&nbsp Lehetséges továbbhaladás:</p>${szov}`
    }

    refreshDataSheet(possibleMoves())


    function goodMove(x, y) {
        console.log("a lepes lehetseges");
        actualPawn.y = y;
        actualPawn.x = x;
        if (matrix[actualPawn.y][actualPawn.x] < 0) {
            matrix[actualPawn.y][actualPawn.x] -= 100
        } else {
            matrix[actualPawn.y][actualPawn.x] += 100
        }

        table.innerHTML = drawTable()


        refreshDataSheet(possibleMoves())
        winner()

    }

    document.addEventListener("click", lepes)
    function lepes(e) {
        if (e.target.matches("td img")) {
            const { x, y } = xyCoord(e.target.parentNode);
            console.log("a matrix erteke: " + matrix[y][x]);
            console.log("itt van kiirava: " + actualPawn.x + " " + actualPawn.y + " " + matrix[actualPawn.y][actualPawn.x]);
            console.log(x, y);
            if (x == actualPawn.x && y - 1 == actualPawn.y) {
                if (fromUp(x, y)) {
                    goodMove(x, y)

                }
            }
            if (x - 1 == actualPawn.x && y == actualPawn.y) {
                if (fromLeft(x, y)) {
                    goodMove(x, y)
                }
            }
            if (x == actualPawn.x && y + 1 == actualPawn.y) {
                if (fromDown(x, y)) {
                    goodMove(x, y)
                }
            }


            if (x + 1 == actualPawn.x && y == actualPawn.y) {
                if (fromRight(x, y)) {
                    goodMove(x, y)
                }
            }
        }
    }


    function fromUp(y2, x2) {
        let mAkt = Math.abs(matrix[actualPawn.y][actualPawn.x])
        if (mAkt % 100 == 14 || mAkt % 100 == 13 || mAkt % 100 == 22 || mAkt % 100 == 24 || mAkt % 100 == 31 || mAkt % 100 == 33 || mAkt % 100 == 34) {
            if (matrix[x2][y2] < 0) {
                matrix[x2][y2] *= -1
            }
            let mXY = Math.abs(matrix[x2][y2] % 100)
            if (mXY == 12 || mXY == 11 || mXY == 22 || mXY == 24 || mXY == 31 || mXY == 32 || mXY == 33) {
                matrix[actualPawn.y][actualPawn.x] -= 100
                if (matrix[actualPawn.y][actualPawn.x] < -100) {
                    matrix[actualPawn.y][actualPawn.x] += 100
                }
                else if (matrix[actualPawn.y][actualPawn.x] > 100) {
                    matrix[actualPawn.y][actualPawn.x] -= 100
                }

                for (let k = 0; k < coinsArr.length; k++) {
                    if (coinsArr[k].x == x2 && coinsArr[k].y == y2) {
                        if (actualPawn.color != coinsArr[k].color || k != actualPawn.coinCode * coin + actualPawn.coinNum) {
                            matrix[x2][y2] *= -1
                            return true;
                        }
                        else {
                            actualPawn.coinNum++;
                        }
                    }
                }

                return true
            }
            else {
                matrix[x2][y2] *= -1
                return false;
            }
        }
        return false
    }


    function fromLeft(y2, x2) {
        let mAkt = Math.abs(matrix[actualPawn.y][actualPawn.x])
        if (mAkt % 100 == 12 || mAkt % 100 == 13 || mAkt % 100 == 21 || mAkt % 100 == 23 || mAkt % 100 == 33 || mAkt % 100 == 32 || mAkt % 100 == 34) {

            if (matrix[x2][y2] < 0) {
                matrix[x2][y2] *= -1
            }
            let mXY = Math.abs(matrix[x2][y2] % 100)
            if (mXY == 11 || mXY == 14 || mXY == 21 || mXY == 23 || mXY == 31 || mXY == 32 || mXY == 34) {
                if (matrix[actualPawn.y][actualPawn.x] < -100) {
                    matrix[actualPawn.y][actualPawn.x] += 100
                }
                else if (matrix[actualPawn.y][actualPawn.x] > 100) {
                    matrix[actualPawn.y][actualPawn.x] -= 100
                }
                for (let k = 0; k < coinsArr.length; k++) {
                    if (coinsArr[k].x == x2 && coinsArr[k].y == y2) {
                        if (actualPawn.color != coinsArr[k].color || k != actualPawn.coinCode * coin + actualPawn.coinNum) {
                            matrix[x2][y2] *= -1
                            return true;
                        }
                        else {
                            actualPawn.coinNum++;
                        }
                    }
                }

                return true
            }
            else {
                matrix[x2][y2] *= -1
                return false;
            }
        }
        return false
    }

    function fromDown(y2, x2) {
        let mAkt = Math.abs(matrix[actualPawn.y][actualPawn.x])
        if (mAkt % 100 == 11 || mAkt % 100 == 12 || mAkt % 100 == 22 || mAkt % 100 == 24 || mAkt % 100 == 31 || mAkt % 100 == 32 || mAkt % 100 == 33) {
            if (matrix[x2][y2] < 0) {
                matrix[x2][y2] *= -1
            }
            let mXY = Math.abs(matrix[x2][y2] % 100)
            if (mXY == 13 || mXY == 14 || mXY == 22 || mXY == 24 || mXY == 31 || mXY == 33 || mXY == 34) {
                if (matrix[actualPawn.y][actualPawn.x] < -100) {
                    matrix[actualPawn.y][actualPawn.x] += 100
                }
                else if (matrix[actualPawn.y][actualPawn.x] > 100) {
                    matrix[actualPawn.y][actualPawn.x] -= 100
                }
                for (let k = 0; k < coinsArr.length; k++) {
                    if (coinsArr[k].x == x2 && coinsArr[k].y == y2) {
                        if (actualPawn.color != coinsArr[k].color || k != actualPawn.coinCode * coin + actualPawn.coinNum) {
                            matrix[x2][y2] *= -1
                            return true;
                        }
                        else {
                            actualPawn.coinNum++;
                        }
                    }
                }
                return true
            }
            else {
                matrix[x2][y2] *= -1
                return false;
            }
        }
        return false
    }

    function fromRight(y2, x2) {
        let mAkt = Math.abs(matrix[actualPawn.y][actualPawn.x])
        if (mAkt % 100 == 11 || mAkt % 100 == 14 || mAkt % 100 == 21 || mAkt % 100 == 23 || mAkt % 100 == 31 || mAkt % 100 == 32 || mAkt % 100 == 34) {
            if (matrix[x2][y2] < 0) {
                matrix[x2][y2] *= -1
            }
            let mXY = Math.abs(matrix[x2][y2] % 100)
            if (mXY == 12 || mXY == 13 || mXY == 21 || mXY == 23 || mXY == 32 || mXY == 33 || mXY == 34) {
                if (matrix[actualPawn.y][actualPawn.x] < -100) {
                    matrix[actualPawn.y][actualPawn.x] += 100
                }
                else if (matrix[actualPawn.y][actualPawn.x] > 100) {
                    matrix[actualPawn.y][actualPawn.x] -= 100
                }
                for (let k = 0; k < coinsArr.length; k++) {
                    if (coinsArr[k].x == x2 && coinsArr[k].y == y2) {
                        if (actualPawn.color != coinsArr[k].color || k != actualPawn.coinCode * coin + actualPawn.coinNum) {
                            matrix[x2][y2] *= -1
                            return true;
                        }
                        else {
                            actualPawn.coinNum++;
                        }
                    }
                }
                return true
            }
            else {
                matrix[x2][y2] *= -1
                return false;
            }
        }
        return false
    }

    endOfRound.addEventListener('click', nextPlayer)
    function nextPlayer(params) {
        turnsNum++;
        actualPawn = pawns[turnsNum % playerNum]
        refreshDataSheet(possibleMoves())
        enableBtn()
    }

}
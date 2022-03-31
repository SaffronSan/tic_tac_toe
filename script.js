let game = [], hstory = [], turn = "X", count = 0, p1 = 0, p2 = 0;
let make = (ste ="",pos="",id="") => box = {
    state: ste,
    postion: pos,
    pic: id,
    box: HTMLDivElement,
    clicked: function(){
        if(this.state == "null"){
            document.getElementById("message").innerHTML = "Message block:";
            this.state = turn;
            document.getElementById(this.pic).src = "/images/"+turn+".png";
            if(turn == "X"){turn = "O";}
            else if(turn == "O"){turn = "X";}
            document.getElementById("message").innerHTML = (count > 3 && winner() == "X")? "Player 1 has won!" : (count > 3 && winner() == "O")? "Player 2 has won!" : (count == 8)? "no one has won!" : "Message block:";
            if(count > 3 && winner() == "X"){
                p1++;
            }else if(count > 3 && winner() == "O"){
                p2++;
            }
            document.getElementById("p1s").textContent = p1;
            document.getElementById("p2s").textContent = p2;
            document.getElementById("turn").innerHTML = "Turn:<br>"+turn;
            count++;
            
        }else{
            document.getElementById("message").innerHTML = "This box has already been selected";
        }
    }
};
/*Winning*/
function checkX(element){
    return element == "X";
}
function checkO(element){
    return element == "O";
}
function winner(){
    let row = [], col = [], dia = [];
    for(i = 0; i != 9;i+=3){
        arr = [];
        for(x = 0; x != 3;x++){if(game[i + x].state != "null") {arr.push(game[i + x].state);}}
        row.push(arr);
    }
    for(i = 0; i != 3;i++){
        arr = [];
        for(x = 0; x != 9;x+=3){if(game[i + x].state != "null") {arr.push(game[i + x].state);}}
        col.push(arr);
    }
    arr = [];
    for(i = 0; i != 12;i+=4){arr.push(game[i].state);}dia.push(arr);
    for(i = 2; i != 8;i+=2){arr.push(game[i].state);}dia.push(arr);
    console.log(row);
    console.log(col);
    console.log(dia);
    for(var i = 0; i != row.length;i++){
        if(row[i].length == 3 || col[i].length == 3 && row[i].every(checkX) || col[i].every(checkX)){
            return "X";
        }else if(row[i].length == 3 || col[i].length == 3 && row[i].every(checkO) || col[i].every(checkO)){
            return "O";
        }
    }
    for(var i = 0; i != 2; i++){
        if(dia[i].length == 3 && dia[i].every(checkX)){
            return "X";
        }else if(dia[i].length == 3 && dia[i].every(checkO)){
            return "O";
        }
    }
    return "no winner";
}
/*Setup*/
let cturns = (t = "",g = []) => h ={
    turn: t,
    game: g
};
function findP(id){
    for(var i = 0; i != 9; i++){
        if(game[i].postion == id){
            return i;
        }
    }
    return -1;
}
function createBox(row){
    let box = HTMLDivElement, pic = HTMLImageElement;
    for(var i = 0; i != 3; i++){
        box = document.createElement("div");
        pic = document.createElement("img");
        pic.className = "img_state";
        pic.id = "r"+row+ "img"+(i+1)
        box.appendChild(pic);
        box.className = "hol";
        box.id = "r"+row+ "h"+(i+1);
        game.push(make("null",box.id,pic.id));
        box.onclick = function(){game[findP(this.id)].clicked()};
        document.getElementById("r"+row).appendChild(box);
    }
}
function restart(click){
    for(var i = 0; i != 9;i++){
        game[i].state = "null";
        document.getElementById(game[i].pic).src = "/images/clear.jpeg";
    }
    if(click == 0){
        document.getElementById("message").innerHTML = "Message block:";
    }
    count = 0;
}
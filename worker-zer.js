class Entity {
    constructor(className, x, y){
        this.className = className;
        this.position = [x,y];
        this.id = "Entity"+ Math.round(Math.random()*600);
    }

    set position(position){
        this.x = position[0];
        this.y = position[1];
    }

    get position(){
        return [this.x,this.y];
    }
}

// var player= {
//     top:0,
//     left:0
// };

//crée mon premier player
let player = new Entity('player',0,0);

var LesEnnemis = Array();

for(var i = 0; i < 20; i++){
    var ennemi = new Entity('ennemi', 0, 0);
    LesEnnemis.push(ennemi);
}




//les requetes de mouvements
let moveRequest= {
    top:0,
    left:0
};

onmessage = function(event){
    console.log(event.data);
    moveRequest = event.data;
};

// var maMap = new Array();
// for(var i = 0 ; i < 8; i++ ) {
//     maMap[i] = new Array();
//     for (var y = 0; y < 8; y++) {
//         maMap[i][y] = Math.floor((Math.random()*2)+1);
//     }
// }

var tous={
    player:player,
    LesEnnemis:LesEnnemis
};

gameTick =function () {

    // switch (player.x){
    //     case -1:
    //         moveRequest.left = 1;
    //         break;
    //     case 10:
    //         moveRequest.left = -1;
    //         break;
    // }
    //
    // switch (player.y){
    //     case -1:
    //         moveRequest.top = 1;
    //         break;
    //     case 10:
    //         moveRequest.top = -1;
    //         break;
    // }


    console.log(player,moveRequest);

    let nextX = Math.max(Math.min(player.position[0] + moveRequest.left , 9) , 0);
    let nextY = Math.max(Math.min(player.position[1] + moveRequest.top , 9) , 0);
    // let nextY = player.position[1] + moveRequest.top;

    player.position = [nextX,nextY];

    for(var t = 0; t < LesEnnemis.length ; t++){
        var enNextX = Math.max(Math.min(LesEnnemis[t].position[0] + (Math.round(Math.random()*2)-1) , 9) , 0);
        var enNextY = Math.max(Math.min(LesEnnemis[t].position[1] + (Math.round(Math.random()*2)-1) , 9) , 0);

        // var enNextY = LesEnnemis[t].position[1] + (Math.round(Math.random()*2)-1);

        LesEnnemis[t].position = [enNextX,enNextY];
    }




    postMessage(tous);

    moveRequest = {
        left:0,
        top:0
    };

};

self.setInterval (gameTick, 100);



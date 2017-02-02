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

var LesObstacles = Array();


//génération des ennemis
for(var i = 0; i < 3; i++){
    var ennemi = new Entity('ennemi', Math.floor((Math.random() * 9) + 1), Math.floor((Math.random() * 9) + 1));
    LesEnnemis.push(ennemi);
}


//génération des obstacles
for(var f = 0; f < 3; f++){
    var rock = new Entity('rock', 1, 2);
    LesObstacles.push(rock);
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
    LesEnnemis:LesEnnemis,
    LesObstacles:LesObstacles
};

gameTick =function () {

    console.log(player,moveRequest);

    let nextX = Math.max(Math.min(player.position[0] + moveRequest.left , 9) , 0);
    let nextY = Math.max(Math.min(player.position[1] + moveRequest.top , 9) , 0);
    // let nextY = player.position[1] + moveRequest.top;

    player.position = [nextX,nextY];

    for(var t = 0; t < LesEnnemis.length ; t++){
        var enNextX = Math.max(Math.min(LesEnnemis[t].position[0] + (Math.round(Math.random()*2)-1) , 9) , 0);
        var enNextY = Math.max(Math.min(LesEnnemis[t].position[1] + (Math.round(Math.random()*2)-1) , 9) , 0);

        LesEnnemis[t].position = [enNextX,enNextY];
    }



    postMessage(tous);

    moveRequest = {
        left:0,
        top:0
    };

};

self.setInterval (gameTick, 100);



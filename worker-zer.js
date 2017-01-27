var player= {
    top:0,
    left:0
};
var moveRequest= {
    top:0,
    left:0
};

var onmessage = function(event){
    console.log(event.data);
    moveRequest = event.data;

};

var maMap = new Array();
for(var i = 0 ; i < 8; i++ ) {
    maMap[i] = new Array();
    for (var y = 0; y < 8; y++) {
        maMap[i][y] = Math.floor((Math.random()*2)+1);
    }
}

var world={
    maMap: maMap,
    player:player
};

var gameTick =function () {
    //console.log(moveRequest);
    player.left = player.left + (moveRequest.left);
    player.top = player.top + (moveRequest.top);
    console.log(world);
    postMessage(world);
};

self.setInterval (gameTick, 100);



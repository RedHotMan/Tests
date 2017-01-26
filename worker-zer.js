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

var gameTick =function () {
    //console.log(moveRequest);
    player.left = player.left + (moveRequest.left);
    player.top = player.top + (moveRequest.top);
    console.log(player);
    postMessage(player);
};

self.setInterval (gameTick, 100);



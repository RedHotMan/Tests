$(function(){
    var monWorker  = new Worker('worker-zer.js');
    
    var moveRequest= {
        top:0,
        left:0
    };

    var player = $(".player");


//Zelda bouge selon la position de la souris
   /* $("#map").on('mousemove',function(e){
      var style  = {
        left : e.pageX,
        top: e.pageY
      };
      $('.player').css(style);
//      console.log(style);
    });*/


   //Ecouteurs sur les evenements - selon les touches haut bas droite gauche
    $('#map').on('keydown keyup', function (e) {
      switch(e.which){
        case 37:
          //go left
          player.removeClass("goUp goDown").addClass('goLeft');
          moveRequest.left = (e.type == "keydown")?-1:0;
          break;
        case 38:
          //go up
          player.removeClass("goLeft goDown").addClass("goUp");
          moveRequest.top = (e.type == "keydown")?-1:0;
          break;
        case 39:
          //go right
          player.removeClass("goLeft goUp goDown");
          moveRequest.left = (e.type == "keydown")?1:0;
          break;

        case 40:
          //go down
          player.removeClass("goUp goLeft").addClass("goDown");
          moveRequest.top = (e.type == "keydown")?1:0;
          break;
      }
        
        monWorker.postMessage(moveRequest);
        
    });
    
    monWorker.onmessage = function(event){
        console.log("Worker left:"+ event.data.player.left);
        console.log("Worker top:"+ event.data.player.top);
        player.css('transform', 'translate(' + event.data.player.left*32 + 'px,' + event.data.player.top*32 + 'px)');

        $("#map").html('');
        for(var i = 0; i < event.data.maMap.length; i++){
            for(var j = 0; j < event.data.maMap.length; j++){
                if(event.data.maMap[i][j] == 1){
                    $("#map").append("<div><img src='media/grass.png'></div>");
                }
                else{
                    $("#map").append("<div><img src='media/grass2.png'></div>");
                }

            }
        }

    };

    monWorker.onerror = function(error){
        console.log("Worker error:"+ error.message + "\n");
        throw error;
    }

});


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
        console.log("Worker left:"+ event.data.left);
        console.log("Worker top:"+ event.data.top);
        player.css('transform', 'translate(' + event.data.left*32 + 'px,' + event.data.top*32 + 'px)');
    };
    
    /*monWorker.onerror = function(error){
        console.log("Worker error:"+ errorMessage + "\n");
        throw error;
    }*/

});


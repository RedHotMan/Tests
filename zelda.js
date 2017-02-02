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
    $('#viewport').on('keydown keyup mousemove', function (e) {
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

      // if(e.type == "mousemove"){
      //     moveRequest.left = (e.offsetX > player.first().position().left)? -1:1
      //     moveRequest.top = (e.offsetY > player.first().position().top)? -1:1
      // }
        
        monWorker.postMessage(moveRequest);
        
    });
    
    monWorker.onmessage = function(event){
        console.log("Worker returned:",event.data);
        let entity  = event.data;
        console.log(entity.LesEnnemis);

        if($("#"+ entity.player.id).length == 0){
            $("#map").append($('<div id="'+ entity.player.id +'" class="'+ entity.player.className +'">'));
        }

        for(var a = 0; a < entity.LesEnnemis.length; a++){
            if($("#"+entity.LesEnnemis[a].id).length == 0){
                $("#map").append($('<div id="'+ entity.LesEnnemis[a].id +'" class="'+entity.LesEnnemis[a].className+'">'));
            }
        }

        for(var b = 0; b < entity.LesObstacles.length; b++){
            if($("#"+entity.LesObstacles[b].id).length == 0){
                $("#map").append($('<div id="'+ entity.LesObstacles[b].id +'" class="'+entity.LesObstacles[b].className+'">'));
            }
        }


        $("#"+ entity.player.id).css('transform', 'translate(' + entity.player.x*32 + 'px,' + entity.player.y*32 + 'px)');

        for(var r = 0; r < entity.LesEnnemis.length; r++){
            $("#"+entity.LesEnnemis[r].id).css('transform','translate(' + entity.LesEnnemis[r].x*32 + 'px,'+ entity.LesEnnemis[r].y*32 + 'px)');
        }

    };

    monWorker.onerror = function(error){
        console.log("Worker error:"+ error.message + "\n");
        throw error;
    }

});


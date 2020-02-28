AFRAME.registerComponent('buttons-toggle', {
    init: function () 
    {
      //pre storing attributes
      camera = document.getElementById("character");              //finds camera
      charCol = camera.getAttribute("material");
      scene = document.querySelector("a-scene");
      sceneID = scene.getAttribute("class");
      //console.log(sceneID);

      //socket io
      let socket = io();

      Context_AF = this;

        Context_AF.el.addEventListener('click', function(event){

          buttonType = Context_AF.el.getAttribute("id");
          console.log(buttonType);
          
          //upon clicking using the buttons id, sets the appropriate material and assigns the new ID
          if (buttonType == "RedButton"){
            Context_AF.el.setAttribute('material', 'color', 'blue');
            Context_AF.el.setAttribute('id', 'BlueButton');
            camera.setAttribute('material', 'color: red');  //forsome reason doesnt even set new color, although the console log showed i selected the correct object and this worked previously
            

            
          //emmits that the team has been switched (meant to be for bots)
            if(sceneID == "p1"){
              socket.emit("p1Red");

            }
            if(sceneID == "p2"){
              socket.emit("p2Red");
            }
            Context_AF.checkTeams();
          }

          if (buttonType == "BlueButton"){
            camera.setAttribute('material', 'color', 'blue');
            //console.log(Context_AF.el);
            Context_AF.el.setAttribute('material', 'color', 'red');
            Context_AF.el.setAttribute('id', 'RedButton');

            //assigning vals
            if(sceneID == "p1"){
              socket.emit("p1Blue");
            }
            if(sceneID == "p2"){
              socket.emit("p2Blue");
            }
            Context_AF.checkTeams();
          }

          

        });

        Context_AF.el.addEventListener('mouseenter', function(event) {
          //increase scale
          Context_AF.el.object3D.scale.set(1.1, 1.1, 1.1);
      });
  
      Context_AF.el.addEventListener('mouseleave', function(event) {
          //decrease scale
          Context_AF.el.object3D.scale.set(1.0, 1.0, 1.0);
      });



     },
    
     checkTeams: function(){
    console.log("checking teams");
  
    /* if (player1Col == player2Col){
       console.log("creating 2 bots");
     }

     else{
       console.log("no bots");
     }
*/
    }
    
    });
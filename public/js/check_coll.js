var redscore=0;
var bluescore=0;
AFRAME.registerComponent('check_coll', {
    init: function () 
    {
        console.log('Listening for Collisions');

        let objc = this;
        console.log(ball);


        //checks if ball has collided with goal, implements score and changes the score value
       if (objc.el.id == "goal1"){
        objc.el.addEventListener('collide', function (e) {
            if (e.detail.body.el.id == 'ball'){
              console.log('collided');

              bluescore = bluescore + 1;
              score = document.getElementById("Score1");
              score.setAttribute('text', 'value',  bluescore);

            }
            
          });
        }

        if (objc.el.id == "goal2"){
            objc.el.addEventListener('collide', function (e) {
                if (e.detail.body.el.id == 'ball'){
                    console.log('collided');

                    redscore = redscore + 1;
                    score = document.getElementById("Score2");
                    score.setAttribute('text', 'value',  redscore);
                }

              });
            }
    }

});
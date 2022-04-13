
import dataObj from "../data.js";
import fixedPoint from "./components/fixedPoint.js";
import Bob from "./components/Bob.js";
import Rod from "./components/Rod.js";

const {canvas, ctx, canvasArea,animCross} = dataObj
const simplePend = () =>{
    const firstPend = document.querySelector(".first-pendulum");
    firstPend.addEventListener("click", function () {
      canvasArea.style.display = "block";
      animCross[0] = true;
      //----------------------
      let ang = 0; //Кут
      const len = 300; //Довжина лінії
      const r = 40; //Радіус кола
      let aVel = 0; //Кутова швидкість
      let aAcc; //Кутове прискорення
      const gravity = 9.81; //Прискорення вільного падіння
      const damp = 0.996; //Коефіцієнт затухання
      let pressing;
      const centerCanvas = {
        x:canvas.width/2,
        y:canvas.height/2 -200
      }
      const ancor = new fixedPoint(centerCanvas.x,centerCanvas.y);
      const rod= new Rod(ancor.x,ancor.y,len,ang);
      console.log(rod.x,rod.y)
      const bob = new Bob(r,40);

      const calculate =(initial,len,triangFunc) =>{
       
        return initial + len * triangFunc;
        
      }
      const draw = function () {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        rod.x=calculate(rod.x0,len,Math.sin(ang));
        rod.y=calculate(rod.y0,len,Math.cos(ang));

        bob.x =rod.x;
        bob.y=rod.y

        ancor.draw(ctx);
        rod.draw(ctx);
        bob.draw(ctx);
      };
      const animate = function () {
        if (!pressing && animCross[0]) {

          requestAnimationFrame(animate);

          draw();

          aAcc = (-gravity / len) * Math.sin(ang);
          aVel += aAcc;
          ang += aVel;
          aVel *= damp;
        }
      };
    
      const clickedCircle = function (mX, mY) {
        let distance = Math.sqrt((mX - bob.x) * (mX - bob.x) + (mY - bob.y) * (mY - bob.y));
        if (distance < r) {
          canvas.style.cursor = "pointer";
          bob.color = pressing ? "green" : "red";
        } else {
          canvas.style.cursor = "auto";
        }
      };
    
      draw();
      const events ={ 
        start:['mousedown','touchstart'],
        move:['mousemove','touchmove'],
        end:['mouseup','touchend']
      }

      for(let i = 0;i<events.start.length;i++) {
        canvas.addEventListener(events.start[i], function (event) {
          pressing = true;
          clickedCircle(event.x, event.y);
        });
    }

     //for(let i = 0;i<events.move.length;i++) {
        canvas.addEventListener( /*events.move[i]*/'mousemove', function (ev) {
          clickedCircle(ev.x, ev.y);
          if (pressing && animCross[0]) {

            ang = Math.atan2(ev.x - ancor.x, ev.y - ancor.y);
            //console.log((ang * 180) / Math.PI);
            draw();
          }
        });
     //}
    
     //for(let i = 0;i<events.end.length;i++) {
        canvas.addEventListener(/*events.end[i]*/'mouseup', function () {
          bob.color = "red";
          pressing = false;
          animate();
        });
     //}
    });
    //---------
};



export default simplePend;
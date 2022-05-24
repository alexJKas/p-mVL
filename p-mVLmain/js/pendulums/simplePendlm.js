
import dataObj from "../data.js";
import fixedPoint from "./components/fixedPoint.js";
import Bob from "./components/Bob.js";
import Rod from "./components/Rod.js";

const {canvas, ctx, canvasArea,animCross} = dataObj
let StopBtnUnactive = true;
const simplePend = () =>{
    const firstPend = document.querySelector(".first-pendulum");
    firstPend.addEventListener("click", function () {
      canvasArea.style.display = "block";
      const settingWind = document.querySelector('.setingsWindowPend1');
      settingWind.style.display='flex';
      animCross[0] = true;
      const timeWind = document.querySelector('.timeWindow');
      const lengthRange=document.getElementById('lengthRange');
      const gravityRange=document.getElementById('gravityRange');
      const stopBtn = document.querySelector('.stopBtn');
      const resultL =document.querySelector('.resultL');
      const resultG = document.querySelector('.resultG');      //----------------------
      let ang = 0; //Кут
      let len = lengthRange.value; //Довжина лінії
      let ms =0;
      let sec =0;
      let min=0;
      const r = 30; //Радіус кола
      let aVel = 0; //Кутова швидкість
      let aAcc; //Кутове прискорення
      let gravity = gravityRange.value; //Прискорення вільного падіння
      const damp = 1; //Коефіцієнт затухання
      let pressing;
      const centerCanvas = {
        x:canvas.width/2,
        y:canvas.height/2 -330
      }
      resultL.textContent=`${Math.round(lengthRange.value*0.02645833)} cm`;
      lengthRange.addEventListener('input',(e)=>{
        len=e.target.value
        resultL.textContent= `${Math.round(e.target.value*0.02645833)} cm`
        console.log(len)
        draw();

      })
      gravityRange.addEventListener('input',(e)=>{
        gravity=e.target.value
        console.log(gravity)
        draw();
      })

      stopBtn.addEventListener('click',()=>{
        if (StopBtnUnactive) {
          stopBtn.textContent = "RESTART"
          StopBtnUnactive = false
        } else {
          aAcc=0;
          aVel=0;
          ang = 0;
          ms=0;
          sec=0;
          min=0;
          timeWind.textContent = '00:00:00'
          stopBtn.textContent = "STOP";
          draw();
          StopBtnUnactive = true;
        }
      })
      const ancor = new fixedPoint(centerCanvas.x,centerCanvas.y);
      const rod= new Rod(ancor.x,ancor.y,len,ang);
      console.log(rod.x,rod.y)
      const bob = new Bob(r,40);

      const calculate =(initial,len,triangFunc) =>{
       
        return initial + len * triangFunc;
        
      }
      let stringClock ='';
      const stopWatch = function() {
        ms+=1/0.6
        parseInt(ms)
        if (ms>=100) {
          sec++;
          ms=0;
        }

        if (sec/60===1) {
          min++;
          sec=0;
        }
        stringClock= `${min<10?'0' + min:min}:${sec<10?'0' + sec:sec}:${ms<10 ?'0' + parseInt(ms):parseInt(ms)}`;
        console.log(stringClock);
        timeWind.textContent = stringClock;


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
        if (!pressing && animCross[0] && StopBtnUnactive) {

          requestAnimationFrame(animate);
          stopWatch();
          draw();


          aAcc = (-gravity / len) * Math.sin(ang);
          aVel += aAcc;
          ang += aVel;
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
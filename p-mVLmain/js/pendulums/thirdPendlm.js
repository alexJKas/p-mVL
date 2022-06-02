import dataObj from "../data.js";
import SpringCoil from "./components/springCoil.js";
import Bob from "./components/Bob.js";

const {canvas, ctx, canvasArea,animCross,centerCanvas} = dataObj
let StopBtnUnactive = true;
const thrdPend = () => {
    const theThirdPend = document.querySelector(".third-pendulum");
    theThirdPend.addEventListener("click", function () {
    canvasArea.style.display = "block";
    const settingWind = document.querySelector('.pendlm3');
    settingWind.style.display='flex';
    animCross[2] = true;
    const timeWind = document.querySelector('.time2');
    const massRange=document.getElementById('massRange');
    const stiffnessRange=document.getElementById('stiffnessRange');
    const stopBtn = document.querySelector('.btn2');
    const resultM =document.querySelector('.resultM');

    //------------------
    const restLenSpr = 200;
    let BobX = centerCanvas.x+restLenSpr;
    let BobY = centerCanvas.y;
    let velBobX = 0;
    let velBobY = 0;
    let accBobX = 0;
    let accBobY = 0;
    let l, x, sinAng, cosAng, ang;
    let pressing;
    let color = "red";
    const AnchorX = centerCanvas.x;
    const AnchorY = centerCanvas.y;
    let k = 0.04;
    let m = 1;
    const r = 40;
    const damp = 1;
    let ms =0;
    let sec =0;
    let min=0;
    //===================
    resultM.textContent=`${massRange.value} kg`;
    massRange.addEventListener('input',(e)=>{
      m=+e.target.value
      resultM.textContent= `${e.target.value} kg`
      console.log(m)
      draw();

    })
    stiffnessRange.addEventListener('input',(e)=>{
      k=e.target.value*0.01
      console.log(k)
      draw();
    })

    stopBtn.addEventListener('click',()=>{
      if (StopBtnUnactive) {
        stopBtn.textContent = "RESTART"
        StopBtnUnactive = false
      } else {
        accBobX =0;
        velBobX = 0 ;
        BobX = centerCanvas.x+restLenSpr;
        ms=0;
        sec=0;
        min=0;
        timeWind.textContent = '00:00:00'
        stopBtn.textContent = "STOP";
        draw();
        StopBtnUnactive = true;
      }
    })

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

    //Objects
    const springCoil = new SpringCoil(AnchorX-150,AnchorY-15,20,r/2);
    const bob = new Bob();
    const draw = function () {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        // c2d.fillRect(575, 100, 50, 50);
        springCoil.draw(ctx,BobX-m,k*100);
        ctx.beginPath();
        ctx.moveTo(AnchorX+200,AnchorY-60);
        ctx.lineTo(AnchorX+200,AnchorY+60);
        ctx.strokeStyle="#bebebe"
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.rect(centerCanvas.x-150,centerCanvas.y+50,-50,-100);
        ctx.fillStyle='#808080'
        ctx.fill();
        ctx.strokeStyle="#000"
        ctx.stroke()
        // spring(AnchorX, AnchorY, 20, BobY);
        
        //ctx.moveTo(BobX, BobY - r);
        bob.x =BobX;
        bob.y=BobY;
        bob.draw(ctx,m+20);


        
        
    };
    //===========
    const animate = function () {
        if (animCross[2] && StopBtnUnactive) {
        requestAnimationFrame(animate);
        l = Math.abs(BobX - AnchorX);
        console.log('l='+ l)
        x = l - restLenSpr;
        console.log('x='+ x)
        //ang = Math.atan2(BobX - AnchorX, BobY - AnchorY);
        //console.log(`Asin=${(ang * 180) / Math.PI}`);
        //ang = Math.acos((BobY - AnchorY) / l);
        //console.log(`Acos=${(angY * 180) / Math.PI}`);
        //console.log(`L=${l}`);
        accBobX = -(k * x / m)  ;

        velBobX += accBobX ;

        BobX += velBobX ;
        velBobX *= damp;
        stopWatch();
        draw();
        }
    };
    const clickedCircle = function (mX, mY) {
        let distance = Math.sqrt(
        (mX - BobX) * (mX - BobX) + (mY - BobY) * (mY - BobY)
        );
        if (distance < r) {
        canvas.style.cursor = "pointer";
        color = pressing ? "green" : "red";
        } else {
        canvas.style.cursor = "auto";
        }
    };
    draw();
    canvas.addEventListener("mousedown", function (event) {
        pressing = true;
        //clickedCircle(event.x);
    });
    canvas.addEventListener("mousemove", function (ev) {
        //clickedCircle(ev.x);
        if (pressing && animCross[2]) {
        BobX = ev.x;
        console.log(BobX,AnchorX,restLenSpr)

        draw();
        }
    });

    canvas.addEventListener("mouseup", function () {
        color = "red";
        pressing = false;
        animate();
    });
    });
} 
export default thrdPend;
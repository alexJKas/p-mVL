import dataObj from '../data.js';
import Bob from './components/Bob.js'
import Rod from './components/Rod.js';
import fixedPoint from './components/fixedPoint.js'

const {canvas, ctx, canvasArea,animCross,centerCanvas} = dataObj
const secPend = () => {
    const secondPend = document.querySelector(".second-pendulum");
    const settingWind2 = document.querySelector('.pendlm2');
    const lengthRange1  =document.getElementById('lengthRange1')
    const lengthRange2 =document.getElementById('lengthRange2')
    const massRange1 =document.getElementById('massRange1')
    const  massRange2=document.getElementById('massRange2')
    const resultL1 =document.querySelector('.resultL1')
    const resultL2 =document.querySelector('.resultL2')
    const resultM1 =document.querySelector('.resultM1')
    const resultM2 =document.querySelector('.resultM2')
    secondPend.addEventListener("click", function () {
    canvasArea.style.display = "block";
    settingWind2.style.display='flex';
    animCross[1] = true;
    //------------------
    console.log(ctx);
    let l1 = 200;
    let l2 = 200;
    const x0 = centerCanvas.x;
    const y0= centerCanvas.y-l1-l2/2;
    let m1 = 15;
    let m2 = 15;
    let ang1 = 0;
    let ang2 = 0;
    let a1V = 0;
    let a2V = 0;
    let a1A = 0;
    let a2A = 0;
    const g = 1;
    const damp1 = 1;
    const damp2 = 1;
    let pressing;
    let color1 = "red";
    let color2 = "red";
    let isPointedBob = [false, false];
    let choosedBob = [false, false];

    resultL1.textContent=`${Math.round(lengthRange1.value*0.02645833)} cm`;
    lengthRange1.addEventListener('input',(e)=>{
      l1=+e.target.value
      resultL1.textContent= `${Math.round(e.target.value*0.02645833)} cm`
      draw();

    })

    resultL2.textContent=`${Math.round(lengthRange2.value*0.02645833)} cm`;
    lengthRange2.addEventListener('input',(e)=>{
      l2=+e.target.value
      resultL2.textContent= `${Math.round(e.target.value*0.02645833)} cm`
      draw();

    })


    resultM1.textContent=`${massRange1.value} kg`;
    massRange1.addEventListener('input',(e)=>{
      m1=+e.target.value
      console.log(m1)
      resultM1.textContent= `${e.target.value} kg`
      draw();

    })

    resultM2.textContent=`${massRange2.value} kg`;
    massRange2.addEventListener('input',(e)=>{
      m2=+e.target.value
      resultM2.textContent= `${e.target.value} kg`
      draw();

    })

    const getAng1AccPart = function (ang1, ang2, a1V, a2V) {
        let prt1_1 = -g * (2 * m1 + m2) * Math.sin(ang1);
        let prt1_2 = -m2 * g * Math.sin(ang1 - 2 * ang2);
        let prt1_3 = -2 * Math.sin(ang1 - ang2) * m2;
        let prt1_4 = a2V * a2V * l2 + a1V * a1V * l1 * Math.cos(ang1 - ang2);
        let den1 = l1 * (2 * m1 + m2 - m2 * Math.cos(2 * ang1 - 2 * ang2));
        let arrExpr = [prt1_1, prt1_2, prt1_3, prt1_4, den1];
        return arrExpr;
    };
    console.log(a1A);
    const getAng2AccPart = function (ang1, ang2, a1V, a2V) {
        let prt2_1 = 2 * Math.sin(ang1 - ang2);
        let prt2_2 = a1V * a1V * l1 * (m1 + m2);
        let prt2_3 = g * (m1 + m2) * Math.cos(ang1);
        let prt2_4 = a2V * a2V * l2 * m2 * Math.cos(ang1 - ang2);
        let den2 = l2 * (2 * m1 + m2 - m2 * Math.cos(2 * ang1 - 2 * ang2));
        let arrExpr = [prt2_1, prt2_2, prt2_3, prt2_4, den2];
        return arrExpr;
    };
    const ancor = new fixedPoint(x0,y0);
    const rod1 = new Rod(ancor.x,ancor.y);
    const rod2 = new Rod(0,0)
    const bob1 = new Bob();
    const bob2 = new Bob();


    const draw = function () {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        ancor.draw(ctx)
        //===========
       rod1.x = ancor.x + l1 * Math.sin(ang1);
       rod1.y = ancor.y + l1 * Math.cos(ang1);
       bob1.x=rod1.x;
       bob1.y=rod1.y;
       console.log(rod1.x,rod1.y);
        //===========
        rod1.draw(ctx);
        //============

        //============
        rod2.x0=bob1.x;
        rod2.y0=bob1.y; 
       rod2.x = bob1.x + l2 * Math.sin(ang2);
       rod2.y = bob1.y + l2 * Math.cos(ang2);
       bob2.x=rod2.x;
       bob2.y=rod2.y;
       console.log(rod2.x,rod2.y);
        //============
        rod2.draw(ctx)
        //============
        //===========
        bob1.draw(ctx, m1);
        bob2.draw(ctx, m2);
    };
    draw();
    let arrExpr1;
    let arrExpr2;
    const animate = function () {
        if (animCross[1] && !pressing) {
        requestAnimationFrame(animate);
        draw();
        arrExpr1 = getAng1AccPart(ang1, ang2, a1V, a2V);
        a1A =
            (arrExpr1[0] + arrExpr1[1] + arrExpr1[2] * arrExpr1[3]) / arrExpr1[4];
        arrExpr2 = getAng2AccPart(ang1, ang2, a1V, a2V);
        a2A =
            (arrExpr2[0] * (arrExpr2[1] + arrExpr2[2] + arrExpr2[3])) / arrExpr2[4];
        console.log(a1A);
        // ang1 += a1V;
        // ang2 += a2V;
        a1V += a1A;
        a2V += a2A;
        ang1 += a1V;
        ang2 += a2V;
        a1V *= damp1;
        a2V *= damp2;
        }
    };
    draw();
    const clickedCircle = function (mX, mY) {
        let distance1 = Math.sqrt((mX - rod1.x) * (mX - rod1.x) + (mY - rod1.y) * (mY - rod1.y));
        let distance2 = Math.sqrt((mX - rod2.x) * (mX - rod2.x) + (mY - rod2.y) * (mY - rod2.y));
        if (distance1 < m1 && !choosedBob[1]) {
        canvas.style.cursor = "pointer";
        bob1.color = pressing ? "green" : "red";
        isPointedBob[0] = true;
        } else if (distance2 < m2 && !choosedBob[0]) {
        canvas.style.cursor = "pointer";
        bob2.color = pressing ? "green" : "red";
        isPointedBob[1] = true;
        } else {
        canvas.style.cursor = "auto";
        }
    };

    canvas.addEventListener("mousedown", function (event) {
        pressing = true;
        clickedCircle(event.x, event.y);
    });

    canvas.addEventListener("mousemove", function (ev) {
        clickedCircle(ev.x, ev.y);
        if (pressing && isPointedBob[0] && !choosedBob[1]) {
        choosedBob[0] = true;
        ang1 = Math.atan2(ev.x - ancor.x, ev.y - ancor.y);
        //ang2 = Math.atan2(ev.x - x1, ev.y - y1);
        console.log((ang1 * 180) / Math.PI);
        draw();
        } else if (pressing && isPointedBob[1] && !choosedBob[0]) {
        choosedBob[1] = true;
        ang2 = Math.atan2(ev.x - rod1.x, ev.y - rod1.y);
        //ang2 = Math.atan2(ev.x - x1, ev.y - y1);
        console.log((ang2 * 180) / Math.PI);
        draw();
        }
    });

    canvas.addEventListener("mouseup", function () {
        color1 = "red";
        color2 = "red";
        pressing = false;
        choosedBob = [false, false];
        isPointedBob = [false, false];
        animate();
    });
    //animate1();
    });
}

export default secPend;
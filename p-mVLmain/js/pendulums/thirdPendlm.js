import dataObj from "../data.js";

const {canvas, ctx, canvasArea,animCross} = dataObj
const thrdPend = () => {
    const theThirdPend = document.querySelector(".third-pendulum");
    theThirdPend.addEventListener("click", function () {
    canvasArea.style.display = "block";
    animCross[2] = true;
    //------------------
    let BobX = 150;
    let BobY = 400;
    let velBobX = 0;
    let velBobY = 0;
    let accBobX = 0;
    let accBobY = 0;
    let l, x, sinAng, cosAng, ang;
    let pressing;
    let color = "red";
    const AnchorX = 150;
    const AnchorY = 150;
    const restLenSpr = 250;
    const k = 0.1;
    const m = 1;
    const r = 40;
    const damp = 0.996;
    const g = 9.81;
    //===================
    // const spring = function (dot_x, dot_y, N, l) {
    //   let x1 = dot_x;
    //   let y1 = dot_y;
    //   let i = -1;
    //   let delty = (i * x1) / N;
    //   let deltx = 30;
    //   let dy = l / N;
    //   let dx;
    //   if (l > 0) {
    //     let vidx = (l * x1) / y1;
    //     let Nx = (i * x1) / deltx;
    //     dx = vidx / Nx;
    //   } else {
    //     dx = 0;
    //   }
    //   const eq = 15;
    //   while (y1 < eq + l) {
    //     dx = -dx;
    //     let x2 = x1 + deltx;
    //     let y2 = y1 + delty;
    //     ctx.beginPath();
    //     ctx.moveTo(x1, x2);
    //     ctx.lineTo(x2 + dx, y2 + dy);
    //     ctx.stroke();
    //     x1 = x2 + dx;
    //     y1 = y2 + dy;
    //     deltx = -deltx;
    //     //i += 1;
    //   }
    // };
    //===================
    const draw = function () {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        // c2d.fillRect(575, 100, 50, 50);
        ctx.beginPath();
        ctx.arc(AnchorX, AnchorY, 5, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#000";
        ctx.fill();
        ctx.moveTo(AnchorX, AnchorY);
        ctx.lineTo(BobX, BobY);
        ctx.stroke();
        // spring(AnchorX, AnchorY, 20, BobY);
        ctx.beginPath();
        //ctx.moveTo(BobX, BobY - r);
        ctx.arc(BobX, BobY, r, -Math.PI / 2, 2 * Math.PI + Math.PI / 2, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
    };
    //===========
    const animate = function () {
        if (animCross[2]) {
        requestAnimationFrame(animate);
        l = Math.sqrt(
            (BobX - AnchorX) * (BobX - AnchorX) +
            (BobY - AnchorY) * (BobY - AnchorY)
        );
        x = l - restLenSpr;
        ang = Math.atan2(BobX - AnchorX, BobY - AnchorY);
        console.log(`Asin=${(ang * 180) / Math.PI}`);
        //ang = Math.acos((BobY - AnchorY) / l);
        //console.log(`Acos=${(angY * 180) / Math.PI}`);
        console.log(`L=${l}`);
        accBobX = (-k / m) * x * Math.sin(ang);
        accBobY = g - (k / m) * x * Math.cos(ang);

        velBobX += accBobX / 5;
        velBobY += accBobY / 5;

        BobX += velBobX / 5;
        BobY += velBobY / 5;
        velBobX *= damp;
        velBobY *= damp;
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
        clickedCircle(event.x, event.y);
    });
    canvas.addEventListener("mousemove", function (ev) {
        clickedCircle(ev.x, ev.y);
        if (pressing && animCross[2]) {
        BobX = ev.x;
        BobY = ev.y;

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

import dataObj from './data.js'

let {canvas, ctx, canvasArea,activeArrow,closeCross,animCross} = dataObj
const generalFunc= () => {
    activeArrow.addEventListener("click", function () {
        document.querySelector(".sd-br").classList.toggle("sd-br-active");
        document.querySelector(".arrow").classList.toggle("arrow-active");
      })
    
    
    console.log(animCross);
    
    canvasArea.style.display = "none";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight + 143;
    
    closeCross.addEventListener("click", function () {
      canvasArea.style.display = "none";
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      animCross = animCross.fill(false, 0);
    });
    
}

export default generalFunc
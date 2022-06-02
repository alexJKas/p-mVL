
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
    canvas.height = window.innerHeight;
    
    closeCross.addEventListener("click", function () {
      canvasArea.style.display = "none";
      const settingWind1 = document.querySelector('.pendlm1');
      const settingWind2 = document.querySelector('.pendlm2');
      const settingWind3 = document.querySelector('.pendlm3');

      settingWind1.style.display='none';
      settingWind2.style.display='none';
      settingWind3.style.display='none';
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      animCross = animCross.fill(false, 0);
    });
    
}

export default generalFunc
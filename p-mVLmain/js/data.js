
//  const canvas = document.querySelector(".cv");
//  const ctx = canvas.getContext("2d");
//  const canvasArea = document.querySelector(".cv-area");
//  const activeArrow = document.querySelector('.arrow')
//  const closeCross = document.querySelector(".close");
 
 
 const dataObj = {
    canvas: document.querySelector(".cv"),
    ctx: document.querySelector(".cv").getContext("2d"),
    canvasArea: document.querySelector(".cv-area"),
    activeArrow: document.querySelector('.arrow'),
    closeCross: document.querySelector(".close"),
    animCross: [true, true, true]
 }
 
export default dataObj;
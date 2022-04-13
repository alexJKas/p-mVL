export default class fixedPoint {
    constructor(x,y) {
        this.x=x;
        this.y=y;
        this.r=5;
        this.color='#000';
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
}
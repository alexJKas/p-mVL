
export default class Bob {
    constructor (r,m) {
        this.r=r;
        this.m=m;
        this.color="red"

    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
}
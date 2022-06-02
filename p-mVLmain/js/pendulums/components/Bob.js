
export default class Bob {
    constructor () {
        this.color="red"

    }

    draw(ctx,r) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
}
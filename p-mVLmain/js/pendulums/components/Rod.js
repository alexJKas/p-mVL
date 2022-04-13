
export default class Rod  {
    constructor(x,y) {
        this.x0=x;
        this.y0=y;
        }
        
        draw(ctx) {
            ctx.beginPath();
            ctx.moveTo(this.x0, this.y0);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
        }

    }

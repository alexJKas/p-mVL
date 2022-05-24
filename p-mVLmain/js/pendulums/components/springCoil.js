export default class springCoil {
    constructor(x,y,l){
        this.x=x;
        this.y=y;
        this.l=l
        this.r=3;
    }

    draw(ctx){
        for(let i=0;i<=this.l;i++){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            ctx.stroke();
            this.x+=i*0.1;
            this.y+=10*Math.sin(i*0.1);

        }     
    }
}
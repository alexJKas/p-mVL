export default class springCoil {
    constructor(x,y,N,deltY){
        this.updateX=x
        this.updateY=y
        this.x1=x;
        this.y1=y;
        this.N=N
        this.deltY=deltY;
        
    }

    draw(ctx,lx,thick){
        this.deltX=(lx-this.x1)/this.N
        for(let i=0;i<=this.N;i++){
            this.x2=this.x1+this.deltX;
            this.y2=this.y1+this.deltY;
            ctx.beginPath();
            ctx.moveTo(this.x1,this.y1);
            ctx.lineTo(this.x2, this.y2);
            ctx.lineWidth = thick;
            ctx.stroke();
            //console.log(this.x1,this.y1,this.x2,this.y2)
            this.x1=this.x2;
            this.y1=this.y2;
            this.deltY=-this.deltY;

        }  
        this.x1=this.updateX
        this.y1=this.updateY
        this.deltY=Math.abs(this.deltY)
    }
}
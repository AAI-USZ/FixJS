function() {
    if (this.type == 'frac') {
        var x = this.x + (this.width/2);

        //ctx.drawImage(this.img, x, this.y + this.sup.height);
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + (this.height/2));
        ctx.lineTo(this.x + this.width, this.y + (this.height/2));
        ctx.closePath();
        ctx.stroke();

        this.sub.x = x - (this.sub.width/2);
        this.sub.y = this.y + this.height - this.sup.height;
        this.sub.draw();

        this.sup.x = x - (this.sup.width/ 2);
        this.sup.y = this.y;
        this.sup.draw();
    }
    else {
        var x = this.x + ((this.width - this.eq.width - this.img.width)/2);

        ctx.drawImage(this.img, x, this.y + this.sup.height);

        this.eq.x = this.x + (this.width - this.eq.width);
        this.eq.y = this.y + ((this.img.height - this.eq.height) / 2 + this.sup.height);
        this.eq.draw();

        this.sub.x = x - ((this.sub.width - this.img.width)/2);
        this.sub.y = this.y + this.img.height + this.sup.height;
        this.sub.draw();

        this.sup.x = x - ((this.sup.width - this.img.width) / 2);
        this.sup.y = this.y;
        this.sup.draw();
    }
}
function() {
    this.update();

    ctx.drawImage(this.img, this.x, this.y + this.sup.height);

    this.eq.x = this.x + this.img.width;
    this.eq.y = this.y + ((this.img.height - this.eq.height) / 2 + this.sup.height);
    this.eq.draw();

    this.sub.x = this.x + ((this.img.width - this.sub.width) / 2);
    this.sub.y = this.y + this.img.height + this.sup.height;
    this.sub.draw();

    this.sup.x = this.x + ((this.img.width - this.sup.width) / 2);
    this.sup.y = this.y;
    this.sup.draw();
}
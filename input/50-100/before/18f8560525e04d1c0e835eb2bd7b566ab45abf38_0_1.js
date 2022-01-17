function(ctx){
	// drawImage(image, sourceX, sourceY, sourceW, sourceH, destX, destY, destW, destH);
	ctx.drawImage(this.sprite, this.animate_idx * 32, this.direction * 32, 32, 32, this.x - characterInfo.x, this.y - characterInfo.y, 32, 32);
}
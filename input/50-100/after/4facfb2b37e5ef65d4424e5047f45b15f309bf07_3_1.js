function(tickInterval) {
		this.ctx.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
		this.ctx.fillStyle = this.backgroundFillStyle;
		this.ctx.globalAlpha = 1.0;
		this.ctx.fillRect(-1, -1, this.canvas.width + 1, this.canvas.height + 1);

		this.render(this.ctx, this.calculateViewportTransform());
	}
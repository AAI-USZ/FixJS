function(tri) {
		self.ctx.fillStyle = "rgba("+tri.color[0]+", "+tri.color[1]+", "+tri.color[2]+", "+tri.color[3]+")";
		self.ctx.strokeStyle = self.ctx.fillStyle;
		self.ctx.beginPath();
		self.ctx.moveTo(tri.pt0[0], tri.pt0[1]);
		self.ctx.lineTo(tri.pt1[0], tri.pt1[1]);
		self.ctx.lineTo(tri.pt2[0], tri.pt2[1]);
		self.ctx.closePath();
		self.ctx.fill();
		self.ctx.stroke();
	}
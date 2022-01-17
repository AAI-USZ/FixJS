function drawPath(cb,e){
		var ctx = this.ctx,
			path = e.data,
			px = path[0], i;
		ctx.clearRect(0,0,this.width,this.height);
		
		ctx.save();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "green";
		ctx.translate(0,this.height/2);
		ctx.beginPath(px.x,px.y);
		for(i=1;px=path[i];i++){ ctx.lineTo(px.x,px.y); }
		ctx.stroke();
		ctx.restore();
		cb&&cb();
	}
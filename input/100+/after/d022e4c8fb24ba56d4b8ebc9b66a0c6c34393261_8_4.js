function drawPath(e){
		var ctx = this.ctx,
			data = e.data,
			path = data.path,
			px = path[0], i;
		
		//TODO: figure out how to shift & scale this data, given that it may be outdated by now
		
		ctx.clearRect(0,0,this.width,this.height);
		
		ctx.save();
		ctx.lineWidth = 1;
		ctx.strokeStyle = "green";
		ctx.translate(0,this.height/2);
		ctx.beginPath(px.x,px.y);
		for(i=1;px=path[i];i++){ ctx.lineTo(px.x,px.y); }
		ctx.stroke();
		ctx.restore();
		this.emit('redraw');
	}
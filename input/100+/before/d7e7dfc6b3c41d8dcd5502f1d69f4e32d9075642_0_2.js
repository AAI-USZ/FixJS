function(thisDraw)
		{
			if(thisDraw < this.lastDraw) return; 
			var start = 40;
			var end = this.trackWidth + 39;
			
			this.ctx.fillStyle = 'rgba(0,0,0,1)';
			
			this.ctx.beginPath();
			this.ctx.moveTo(start, 10);
			this.ctx.lineTo(start, 20);
			this.ctx.stroke();
			
			this.ctx.beginPath();
			this.ctx.moveTo(end, 10);
			this.ctx.lineTo(end, 20);
			this.ctx.stroke();
			
			var txt = (this.offset).toString();
			var wt = this.ctx.measureText(txt).width;
			this.ctx.fillText(this.offset, start-wt, 10);
			var txt = (this.offset + this.numBases).toString();
			var wt = this.ctx.measureText(txt).width;
			this.ctx.fillText(txt, end-wt, 10);
		}
function(w, thisDraw)
		{
			var i = 1;
			var trackheight = 20;
			var padding = 3;
			var labelWidth = this.labelWidth;
			
			w = w - trackheight;
			
			for(var t in this.tracks)
			{
				if(thisDraw < this.lastDraw) return; 
				var tracky  = i*(trackheight + padding);
				var isReverse = this.tracks[t].isReverse;
				
				this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
				this.ctx.fillText(t, 5, ++i * (trackheight + padding) -10);
				
				this.ctx.fillStyle = 'rgba(80, 80, 80, 0.1)';
				this.ctx.fillRect(labelWidth, tracky, w, trackheight);
				
				
				this.lastpos = 0;
				var features = this.tracks[t].features;
				var count = features.length;
				
				this.baseWidth = w / this.numBases;
				
				for(var j = 0; j != count; j++)
				{
					if(thisDraw < this.lastDraw) return; 
					if(features[j].s > this.offset + this.numBases) break;
					if(features[j].e < this.offset) continue;
					
					var start = labelWidth + (Math.max((features[j].s - this.offset) * this.baseWidth, 0));
					var width = (Math.min(features[j].e, this.numBases + this.offset) - Math.max(this.offset, features[j].s)) * this.baseWidth;
					
					if((start+width) < (this.lastpos + 1)) continue;
					this.lastpos = start + width;
					this.ctx.fillStyle = 'rgba(255, 0, 0, 1)';
					this.ctx.fillRect(start, tracky, width, trackheight);
					
					
					//this.ctx.strokeRect(start, tracky, width, trackheight);
				}
				
				this.ctx.fillStyle = 'rgba(200,200,200,0.3)';
				this.ctx.beginPath();
				if(isReverse)
				{
					this.ctx.moveTo(labelWidth, tracky);
					this.ctx.lineTo(labelWidth * 0.7, tracky + (trackheight * .5));
					this.ctx.lineTo(labelWidth, tracky + trackheight);
					this.ctx.closePath();
					this.ctx.fill();
					
					this.ctx.beginPath();
					var x = labelWidth + w;
					this.ctx.moveTo(x, tracky);
					this.ctx.lineTo(x - labelWidth * 0.3, tracky + (trackheight * .5));
					this.ctx.lineTo(x, tracky + trackheight);
					this.ctx.closePath();
					this.ctx.fill();
				}
				else
				{
					this.ctx.moveTo(labelWidth, tracky);
					this.ctx.lineTo(labelWidth * 1.3, tracky + (trackheight * .5));
					this.ctx.lineTo(labelWidth, tracky + trackheight);
					this.ctx.closePath();
					this.ctx.fill();
					
					this.ctx.beginPath();
					var x = labelWidth + w;
					this.ctx.moveTo(x, tracky);
					this.ctx.lineTo(x + labelWidth * 0.3, tracky + (trackheight * .5));
					this.ctx.lineTo(x, tracky + trackheight);
					this.ctx.closePath();
					this.ctx.fill();
				}
			}
		}
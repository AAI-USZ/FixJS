function(w, thisDraw)
		{
			var i = 1;
			var trackheight = 20;
			var padding = 3;
			var labelWidth = this.labelWidth;
			
			for(var t in this.tracks)
			{
				if(thisDraw < this.lastDraw) return; 
				var tracky  = i*(trackheight + padding);
				
				this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
				this.ctx.fillText(t, 5, ++i * (trackheight + padding) -10);
				
				this.ctx.fillStyle = 'rgba(80, 80, 80, 0.1)';
				this.ctx.fillRect(labelWidth, tracky, w, trackheight);
				
				this.lastpos = 0;
				var features = this.tracks[t].features;
				var count = features.length;
				
				this.baseWidth = this.trackWidth / this.numBases;
				
				for(var j = 0; j != count; j++)
				{
					if(thisDraw < this.lastDraw) return; 
					if(features[j].s > this.offset + this.numBases) break;
					if(features[j].e < this.offset) continue;
					
					/*if(debug){
						console.debug('drawing ' + features[j].i);
						console.debug(this.baseWidth);
						console.debug((40 + (features[j].s * this.baseWidth)));
						console.debug(tracky);
						console.debug((features[j].e - features[j].s) * this.baseWidth);
					}*/
					
					var start = labelWidth + (Math.max((features[j].s - this.offset) * this.baseWidth, 0));
					var width = (features[j].e - Math.max(this.offset, features[j].s)) * this.baseWidth;
					
					if((start+width) < (this.lastpos + 1)) continue;
					this.lastpos = start + width;
					this.ctx.fillStyle = 'rgba(255, 0, 0, 1)';
					this.ctx.fillRect(start, tracky, width, trackheight);
					//this.ctx.strokeRect(start, tracky, width, trackheight);
				}
			}
		}
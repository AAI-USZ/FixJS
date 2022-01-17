function(){
					var yLabels = [];
					var chartHeight = o.height;
					var numLabels = Math.round(chartHeight / 30);
					//var totalRange = this.topValue() + Math.abs(this.bottomValue());
					var loopInterval = Math.round(this.totalYRange() / Math.floor(numLabels)); //fix provided from lab
					loopInterval = Math.max(loopInterval, 1);
					for(var j=this.bottomValue(); j<=topValue; j+=loopInterval){
						yLabels.push(j); 
					}
					if(yLabels[yLabels.length-1] != this.topValue()) {
						yLabels.pop();
						yLabels.push(this.topValue());
					}
					return yLabels;
				}
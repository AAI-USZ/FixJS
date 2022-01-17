function(){
			if (g_Frames >= this.generate){
				var tempY = Math.cos(this.currentX * Math.PI/(this.generate / 2));
				this.debugY = tempY;
				// if(tempY == 1){
					// console.log(g_Frames);
				// }
	
				tempY = (this.canvas.height / 2 ) - tempY * (this.canvas.height / 2);
				
				var newPoint = {X: this.canvas.width, Y:tempY};
				
				this.points.push(newPoint);
				if(this.points[0].X < 0){
					this.points.splice(0, 1);
				}
				this.currentX++;
			}
		}
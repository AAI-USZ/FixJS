function() {
				var ih = h-22;
				var posY = 8;
				var ratio = this.width / this.height;
				var iw = ih * ratio;
				var posX = x+w - iw - 8;
				context.save();
				
				epyxRenderer.roundedCorners(context,posX,posY,iw,ih,20,1,1,1,1,false);
				context.clip();
				context.fillStyle = "#EEE";
				context.fillRect(posX,posY,iw,ih);
				context.drawImage(this,posX,posY,iw,ih);
				context.restore();
				
				context.save();
				context.shadowOffsetX = 0;
				context.shadowOffsetY = 0;
				context.shadowColor = "rgba(0,0,0,0.8)";
				context.shadowBlur = 4;
				context.strokeStyle = "white";
				epyxRenderer.roundedCorners(context,posX,posY,iw,ih,20,1,1,1,1,false);
				context.lineWidth = 2;
				context.stroke();
				context.restore();
				
				// We have the size of the photo, display the BoxInfos in the remaining space
		        var maxX = w - iw - 20;
		        var nx = x;
		        var ny = y+ ( headSize * 2.3 );
		        nx = displayBoxInfo(nx+10,ny, data.birthDate,maxX);
		        nx = displayBoxInfo(nx+10,ny, data.glider,maxX);
		        nx = displayBoxInfo(nx+10,ny, data.flyingSince,maxX);
		        nx = displayBoxInfo(nx+10,ny, data.acroSince,maxX);
			}
function(context,w,h,data) {
		var x = 0;
		var y = 0;
		
		var headSize = h/5;
		
		//----- Display base
		context.save();
		var my_gradient = context.createLinearGradient(x, y, x, y+h);
		my_gradient.addColorStop(0, "#CCC");
		my_gradient.addColorStop(1, "#EEE");
		context.fillStyle = my_gradient;
		context.strokeStyle = "rgb(0,0,0)";
		
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 3;
		context.shadowColor = "rgba(0,0,0,0.3)";
		context.shadowBlur = 4;
		epyxRenderer.roundRect(context,x+1, y+1, w-2, h-8,20,true,true);
		
		//----- Display name
		context.font = "bold "+headSize+"pt arial";
		context.fillStyle = "black";
		context.fillText(data.name,x+headSize*2.3,y+headSize*1.4);
		context.restore();
		
		
		
		//----- Display flag
		if ( data.country ) {
			var flag = new Image();
			flag.src = "images/flags/"+data.country.toLowerCase()+".png";
			flag.onload = function() {
				var posX = 2;
				var posY = 0;
				var ratio = this.width / this.height;
				var ih = headSize * 2 ;
				var iw = ih * ratio;
				context.save();
				context.shadowOffsetX = 1;
				context.shadowOffsetY = 3;
				context.shadowColor = "rgba(0,0,0,0.3)";
				context.shadowBlur = 7;
				//context.drawImage(flag,x+w+posX+3,y+3,rowHeight-17,rowHeight-17);
				context.drawImage(this,posX,posY,iw,ih);
				
				context.restore();
			};
		}
		
		//------ Display photo
		if ( data.imageSrc ) {
			var photo = new Image();
			photo.src = data.imageSrc;
			photo.onload = function() {
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
			};
			// meanwhile
		}
		
		var displayBoxInfo = function( px,py,text,maxX ) {
			if ( !text ) return px;
			context.save();
			context.font = (headSize/1.7)+"pt arial" ;
			
			var ih = headSize*1.2;
			var textToDisplay = text;
			var iw = context.measureText( text ).width * 1.1;
			if ( maxX ) {
				if ( px >= maxX ) return px;
				if ( (px + iw) > maxX ) {
					iw = maxX -px;
					var maxW = iw - 10;
					var originalTxt = text;
					var txt = originalTxt;
					var tw = context.measureText(txt).width;
					var slice = 1;
					while ( slice < originalTxt.length && tw > maxW ) {
						txt = originalTxt.slice(0,-slice)+"...";
						tw = context.measureText(txt).width;
						slice++;
					}
					textToDisplay = txt;
				}
			}
			context.shadowOffsetX = 1;
		    context.shadowOffsetY = 3;
			context.shadowColor = "rgba(0,0,0,0.5)";
			context.shadowBlur = 6;
			context.lineWidth = 2;
			epyxRenderer.roundRect(context,px, py, iw, ih,headSize/6,true,true);
			context.fillStyle = "white";
			
			context.textAlign = "left";
			context.shadowOffsetX = 0;
			context.shadowOffsetY = 0;
			context.shadowColor = "rgba(0,0,0,0.8)";
			context.shadowBlur = 4;
			context.shadowColor= undefined;
			context.shadowBlur= undefined;
			context.fillText(textToDisplay, px+(iw*0.05), py+(ih*0.75),iw-14);
			
			//+++++-- Highlight ---
			var my_gradient = context.createLinearGradient(px, py+1, px, py+(ih/4));
			my_gradient.addColorStop(0, "rgba(255,255,255,0.0)");
			my_gradient.addColorStop(0.1, "rgba(255,255,255,0.4)");
			my_gradient.addColorStop(1, "rgba(0,0,0,0.0)");
			context.fillStyle = my_gradient;
			context.shadowColor= undefined;
			context.shadowBlur= undefined;
			epyxRenderer.roundRect(context,px+1, py+1, iw-6, 40,15,true,false);
			context.restore();
			return px + iw;
		};
		
		//--- display moto
		if ( data.moto && h >= 180) {
			context.font = "bold "+(headSize/1.8)+"pt arial" ;
			var maxW = w-200;
			var originalTxt = data.moto;
			var txt = originalTxt;
			var tw = context.measureText(txt).width;
			var slice = 1;
			while ( slice < originalTxt.length && tw > maxW ) {
				txt = originalTxt.slice(0,-slice)+"...";
				tw = context.measureText(txt).width;
				slice++;
			}
			context.save();
			context.fillStyle = "#444";
			context.fillText(txt, x+12, y+(headSize * 4.5),60);
			context.restore();
		}
		
		//----- Global highlight
		context.save();
		
		context.shadowOffsetX = 0;
		context.shadowOffsetY = -15;
		context.shadowColor = "rgba(255,255,255,0.8)";
		context.shadowBlur = 5;
		var my_gradient = context.createLinearGradient(x, y+headSize*1.5, x, y+headSize*1.5 + (headSize /2) );
		my_gradient.addColorStop(0, "rgba(0,0,0,0.0)");
		my_gradient.addColorStop(1, "rgba(0,0,0,0.2)");
		context.fillStyle = my_gradient;
		epyxRenderer.roundRect(context,x+1, y+headSize*1.5, w-10,(headSize /2),2,true,false);
		//context.fillRect(x+1,y+1,w-2,50);
		context.restore();
		
	}
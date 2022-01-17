function(self){
			var EW = self.EW;
			var canvas = EWindicators.getEwCanvas();
			
			var pos = shipManager.getShipPositionForDrawing(ship);
            

			if (EW.type == "OEW" || EW.type == "SOEW" || EW.type == "SDEW" || EW.type == "DIST"){
				var posE = shipManager.getShipPositionForDrawing(gamedata.getShip(EW.targetid));
				var a = (EW.amount == 1) ? 0.50 : 0.50;
				
                if (EW.type == "OEW"){
                    if (ship.userid == gamedata.thisplayer){
                        canvas.strokeStyle = "rgba(225,225,250,"+a+")";
                        canvas.fillStyle = "rgba(225,225,250,"+a+")";
                    }else{
                        canvas.strokeStyle = "rgba(125,12,12,"+a+")";
                        canvas.fillStyle = "rgba(125,12,12,"+a+")";
                    }
                }else if (EW.type == "SOEW"){
                    if (ship.userid == gamedata.thisplayer){
                        canvas.strokeStyle = "rgba(100,220,240,"+a+")";
                        canvas.fillStyle = "rgba(100,220,240,"+a+")";
                    }else{
                        canvas.strokeStyle = "rgba(125,12,12,"+a+")";
                        canvas.fillStyle = "rgba(125,12,12,"+a+")";
                    }
                }else if (EW.type == "SDEW"){
                    if (ship.userid == gamedata.thisplayer){
                        canvas.strokeStyle = "rgba(160,250,100,"+a+")";
                        canvas.fillStyle = "rgba(160,250,100,"+a+")";
                    }else{
                        canvas.strokeStyle = "rgba(125,12,12,"+a+")";
                        canvas.fillStyle = "rgba(125,12,12,"+a+")";
                    }
                }else if (EW.type == "DIST"){
                    if (ship.userid == gamedata.thisplayer){
                        canvas.strokeStyle = "rgba(255,115,40,"+a+")";
                        canvas.fillStyle = "rgba(255,115,40,"+a+")";
                    }else{
                        canvas.strokeStyle = "rgba(255,115,40,"+a+")";
                        canvas.fillStyle = "rgba(255,115,40,"+a+")";
                    }
                }
                
				var w = Math.ceil(( EW.amount )*gamedata.zoom*0.5);
				var start = mathlib.getPointInDistanceBetween(pos, posE, 38*gamedata.zoom);
				graphics.drawLine(canvas, start.x, start.y, posE.x, posE.y, w);
				graphics.drawCircleAndFill(canvas, posE.x, posE.y, 5*gamedata.zoom, 0 );
			}
            
            if (EW.type == "BDEW"){
                var a = EW.amount *0.01;
                a += 0.1;
				if (ship.userid == gamedata.thisplayer){
					canvas.strokeStyle = "rgba(160,250,100,0.5)";
                        canvas.fillStyle = "rgba(160,250,100,"+a+")";
				}else{
					canvas.strokeStyle = "rgba(125,12,12,0.5)";
					canvas.fillStyle = "rgba(125,12,12,"+a+")";
				}
				
				graphics.drawCircleAndFill(canvas, pos.x, pos.y, 20.5*hexgrid.hexWidth(), 2 );
			}
		}
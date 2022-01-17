function(self){
			var EW = self.EW;
			var canvas = EWindicators.getEwCanvas();
			
			var pos = shipManager.getShipPositionForDrawing(ship);
            

			if (EW.type == "OEW"){
				var posE = shipManager.getShipPositionForDrawing(gamedata.getShip(EW.targetid));
				var a = (EW.amount == 1) ? 0.50 : 0.50;
				
				if (ship.userid == gamedata.thisplayer){
					canvas.strokeStyle = "rgba(225,225,250,"+a+")";
					canvas.fillStyle = "rgba(225,225,250,"+a+")";
				}else{
					canvas.strokeStyle = "rgba(125,12,12,"+a+")";
					canvas.fillStyle = "rgba(125,12,12,"+a+")";
				}
				var w = Math.ceil(( EW.amount )*gamedata.zoom*0.5);
				var start = mathlib.getPointInDistanceBetween(pos, posE, 38*gamedata.zoom);
				graphics.drawLine(canvas, start.x, start.y, posE.x, posE.y, w);
				graphics.drawCircleAndFill(canvas, posE.x, posE.y, 5*gamedata.zoom, 0 );
			}
		}
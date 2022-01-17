function()
		{
			// Draw ATTACK RANGE Circle
			// if(DRAW_RANGE_CIRCLE)
			// {
			// 	var pointArray = calcPointsCirc(X, Y, Type.AttackDistance,1);
			// 	canvasContext.beginPath();
			// 	canvasContext.arc(X, Y, Type.AttackDistance, 0, 2 * Math.PI, false)
			// 	canvasContext.strokeStyle = Team.getColor().getColorStringWithAlpha(.2);
			// 	canvasContext.stroke();
			// 	canvasContext.closePath();
			// }

			// if(DRAW_DISTANCE_CIRCLE)
			// {
			// 	var pointArray = calcPointsCirc(X, Y, Type.SightDistance,1);
			// 	canvasContext.beginPath();
			// 	canvasContext.arc(X, Y, Type.SightDistance, 0, 2 * Math.PI, false)
			// 	canvasContext.strokeStyle = Team.getColor().getColorStringWithAlpha(.2);
			// 	canvasContext.stroke();
			// 	canvasContext.closePath();
			// }
			DRAW_TARGET_LINE = true; // True for now...
			if(DRAW_TARGET_LINE && Target != null && Tanks.contains(Target) && Type.Kind != TankKindEnum.TURRET)
			{
				var mX = this.getX(), mY = this.getY(),
					x = Target.getX(), y = Target.getY(),
					dx = x - X,
					dy = y - Y,
					w2 = WIDTH * 0.5,
					h2 = HEIGHT * 0.5,
					x2 = x, y2 = y;

				if (dx < -w2) x2 = x + WIDTH;
				if (dx > w2)  x2 = x - WIDTH;
				if (dy < -h2) y2 = y + HEIGHT;
				if (dy > h2)  y2 = y - HEIGHT;

				// Line's basics:
				if(debug.targetLine == null || debug.targetLine == undefined){
					debug.targetLine = new Kinetic.Line({
						stroke : Team.getColor().getStringAlpha(.5),
						strokeWidth : 1,
						dashArray: [rndInt(10,35), rndInt(5,10)]
					});

					LAYER.add(debug.targetLine);
				}

				// I know this is breaking the two line thing, just haven't gotten to it yet...
				/* if line cuts through edge of world we need to draw two lines on each side of screen to simulate
				*  target wrapping.  law of sines to figure out what the lines will be (creating triangles) */
				var iX = (x == x2) ? x : x2;
				var iY = (y == y2) ? y : y2;
				var iPoints = [mX,mY,iX,iY];

				if(!debug.targetLine.getPoints().compare(iPoints)) // Prevents the line from constantly being repositioned if the two are the same!
					debug.targetLine.setPoints(iPoints);

			}
			else
			{
				if(debug.targetLine != null || debug.targetLine != undefined)
				{
					LAYER.remove(debug.targetLine); // No need to draw it any longer
					debug.targetLine = null; // Readies the line for next time a target is found
				}
			}


			// Draw FOV
			// if(DRAW_FOV)
			// {
			// 	var useThisAngle = TurretAngle;
			// 	var useAttackAngle = Type.TurretAttackAngle;
			// 	if(!Type.AttackingUnit)
			// 	{
			// 		useThisAngle = BaseAngle;
			// 		useAttackAngle = 45;
			// 	}
			// 	else if(this.isPlane() && Target == null)
			// 		useThisAngle = BaseAngle;

			// 	canvasContext.beginPath();
			// 	canvasContext.strokeStyle = Team.getColor().getColorStringWithAlpha(.5);
			// 	canvasContext.moveTo(X,Y);
			// 	canvasContext.arc(X,Y,Type.SightDistance,useThisAngle - (Math.PI / 180) * useAttackAngle,useThisAngle + (Math.PI / 180) * useAttackAngle,false);
			// 	canvasContext.closePath();
			// 	//canvasContext.fillStyle = Team.getColor().getColorStringWithAlpha(.05);
			// 	//canvasContext.fill();
			// 	canvasContext.stroke();

			//}
		}
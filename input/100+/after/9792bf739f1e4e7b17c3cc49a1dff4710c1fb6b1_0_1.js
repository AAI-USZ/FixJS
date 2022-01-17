function moveForward()
		{
			var turnspeed = TurnSpeed;

			//Find heading towards destination:

			while(TargetBaseAngle > Math.PI)
				TargetBaseAngle -=  2 * Math.PI;
			while(TargetBaseAngle < -Math.PI)
				TargetBaseAngle += 2 * Math.PI;

			//Turn towards heading:
			angleDiff = TargetBaseAngle - BaseAngle;
			if(Math.abs(angleDiff) > Math.PI) {
				if(angleDiff > 0)
					BaseAngle -= turnspeed;
				else
					BaseAngle += turnspeed;
			} else {
				if(Math.abs(angleDiff) > turnspeed) {
					if(angleDiff > 0)
						BaseAngle += turnspeed;
					else
						BaseAngle -= turnspeed;
				} else {
					BaseAngle = TargetBaseAngle;
				}
			}

			if(BaseAngle > Math.PI)
				BaseAngle -= 2 * Math.PI;
			if(BaseAngle < -Math.PI)
				BaseAngle += 2 * Math.PI;

			//Move along current heading:
			if(Math.abs(TargetBaseAngle - BaseAngle) < MAX_MOVE_ANGLE || Type.Kind == TankKindEnum.PLANE)
			{
				var movespeed = MoveSpeed;

				if(This.isPlane() && Target != null && Target.isPlane() && Target.getMoveSpeed() < movespeed
					&& This.getDistanceSquaredFromPoint(X,Y) < Type.MinRange * Type.MinRange &&
					Type.Kind != Target.getKind())
				{
					/* if the target is within 30* of our angle, slow down so we can attack... otherwise circle around */
					if(BaseAngle > Target.getBaseAngle() - (Math.PI / 15) && BaseAngle < Target.getBaseAngle() + (Math.PI / 15))
						movespeed = Target.getMoveSpeed();
				}

				X += movespeed * Math.cos(BaseAngle);
				Y += movespeed * Math.sin(BaseAngle);

				
				if (X > WIDTH) X -= WIDTH; // if you reach the right side
				else if (X < 0) X += WIDTH; // if you reach the left side

				if (Y > HEIGHT) Y = Math.abs(Y - HEIGHT); // If you reach the bottom... set you back at the top
				else if (Y < 0) Y = Math.abs(Y + HEIGHT); // If you reach the top (this works)... set you back at the bottom
				
			}
		}
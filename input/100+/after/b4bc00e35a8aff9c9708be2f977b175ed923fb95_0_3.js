function() {
			
			if(exploding) return;

			X += Dx;
			Y += Dy;
			Time--;

			if (X > WIDTH) X -= WIDTH; // if you reach the right side
			else if (X < 0) X += WIDTH; // if you reach the left side

			if (Y > HEIGHT) Y = Math.abs(Y - HEIGHT); // If you reach the bottom... set you back at the top
			else if (Y < 0) Y = Math.abs(Y + HEIGHT); // If you reach the top (this works)... set you back at the bottom

			if(Type === ShotType.MISSLE) {
				//Smokes.add(new Smoke(X, Y, 2, 3, 20, 150));
				//Smokes.add(new Smoke((X + LastX) / 2, (Y + LastY) / 2, 1, 3, 20, 150));

				LastX = X;
				LastY = Y;

				if(Target === null || !Tanks.contains(Target)) {
					var BestDotProduct = -1;
					for(var n in Tanks) {
						if(Tanks.hasOwnProperty(n) && Tanks.contains(Tanks[n]) &&
							Tanks[n].getTeam() != Team && (AirAttack || !Tanks[n].isPlane())) {

							var DistanceMagSquared = Tanks[n].getDistanceSquaredFromPoint(X, Y);

							if(DistanceMagSquared < 200 * 200) {
								var SpeedMag = Math.sqrt(Dx * Dx + Dy * Dy);
								var DistanceMag = Math.sqrt(DistanceMagSquared);
								var DotProduct = (Dx * (Tanks[n].getX() - X) + Dy * (Tanks[n].getY() - Y)) / (SpeedMag * DistanceMag);
								if(DotProduct > BestDotProduct) {
									Target = Tanks[n];
                                    LastAngle = this.getAngleFromPoint(Target.getX(), Target.getY());
									BestDotProduct = DotProduct;
								}
							}
						}
					}
				}

				if(Target != null && Tanks.contains(Target)) {
					var speed = MISSLE_ACCELERATION + Math.sqrt(Dx * Dx + Dy * Dy);
					var angle = Math.atan2(Dy, Dx);
					var angleToTarget = getAngleFromPoint(Target.getX(), Target.getY(), X, Y);
					var RotateAngle = MISSLE_ROTATION * (angleToTarget - LastAngle);
					angle += RotateAngle > 0 ? Math.min(RotateAngle, MAX_MISSLE_ROTATION)
											 : Math.max(RotateAngle, -MAX_MISSLE_ROTATION);
					LastAngle = angleToTarget;

					Dx = speed * Math.cos(angle);
					Dy = speed * Math.sin(angle);
				}
			}

			if(Time <= 0) explode();

			if(Type != ShotType.SHELL && Type != ShotType.BOMB)
			{
				// FOR LOOP! Need to loop thru units != to my team (instead of EVERYONE)
				for(var n in Tanks) {
					if(Tanks.hasOwnProperty(n) && Tanks.contains(Tanks[n])) {
						if(Tanks[n].getTeam() != Team && (AirAttack || !Tanks[n].isPlane()) &&
							Tanks[n].getDistanceSquaredFromPoint(X, Y) < Math.max(Dx * Dx + Dy * Dy, Tanks[n].getRadiusSquared())) {
								Tanks[n].takeDamage(Damage, Shooter);
								explode();
						}
					}
				}
			}
		}
function(sX, sY, radius, alpha)
		{
			if(HEALCIRCLE == null) // Always add if null
			{
				HEALCIRCLE = new Kinetic.Circle({
					x: sX,
					y: sY,
					radius: radius,
					fill: Team.getColor().getStringAlpha(alpha)
				});

				//LAYER.add(HEALCIRCLE);
				//HEALCIRCLE.moveToBottom();
			}
			else if(Type != TankKindEnum.BASE)
				HEALCIRCLE.setPosition(sX,sY); // This is for the healing tanks.

			return HEALCIRCLE;
		}
function()
		{
			if(HPBAR == null)
			{
				HPBAR = new Kinetic.Rect({
					x: X - 10, // Offset it to the left a bit
					y: Y - 10, // Offset it just above the unit
					width: 40,
					height: 3,
					fill: "green",
					stroke: "black",
					strokeWidth: 1
				});
				LAYER.add(HPBAR);
				HPBAR.hide(); // We're at full health, no need!
			}
			else
			{
				if(HitPoints <= 0) 
					HPBAR.hide(); // Since the health dropped below 0, hide it
				else
					if(HitPoints < Type.HitPoints && HitPoints != 0)
					{
						HPBAR.show(); // We're less than 100%, go!
						HPBAR.setPosition(X-10,Y-10);
						HPBAR.setWidth(40*(HitPoints/Type.HitPoints));

						if((HitPoints/Type.HitPoints) <= .35) HPBAR.fill("red");
						else HPBAR.fill("green");
					}
			}
		}
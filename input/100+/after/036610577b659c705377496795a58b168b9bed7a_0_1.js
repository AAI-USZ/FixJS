function()
		{
			if(this.getShape() != null)
			{
				if(HPBAR == null)
				{
					HPBAR = new Kinetic.Rect({
						x: X - 15, // Offset it to the left a bit
						y: Y - 10, // Offset it just above the unit
						width: 25,
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
					 	if(HPBAR.isVisible()) HPBAR.hide(); // Since the health dropped below 0, hide it
					 else
					 	if(HitPoints < Type.HitPoints && HitPoints != 0)
						{
							if(!HPBAR.isVisible()) HPBAR.show(); // We're less than 100%, go!

							HPBAR.setPosition(X-15,Y-10);
							HPBAR.setWidth(25*(HitPoints/Type.HitPoints));

							if((HitPoints/Type.HitPoints) <= .35) HPBAR.fill("red");
							else HPBAR.fill("green");
						}
				}
			}
		}
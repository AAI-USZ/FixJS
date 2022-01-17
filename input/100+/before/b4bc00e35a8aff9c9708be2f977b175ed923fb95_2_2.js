function draw()
	{
		document.getElementById("bottomBanner").getElementsByTagName("div")[0].innerHTML = getFPS() + " FPS";
		
		// Draw/Activate items
		for(var n in Tanks)
		{
			if (Tanks.hasOwnProperty(n) && Tanks.contains(Tanks[n])) {
				Tanks[n].draw(); // Based off this tanks type, it will draw them and their position
				Tanks[n].doStuff(); // Will either make them move, fire, retreat, go stupid, or appear.
			}
		}

		for(var n in Bullets)
		{
			if (Bullets.hasOwnProperty(n) && Bullets.contains(Bullets[n])) {
				Bullets[n].draw();
				Bullets[n].move();

			}
		}
		// Loop thru Bullets : Bullets are constaly moving between source/destination. They have a end State of MetDestination
		// Loop thru Smokes : From Missles/Explosions/Crashes (its all inbetween)
		// Loop thru Explosions : When missles/bullets/planes (crash)/tanks dying on their target location
		// Loop thru Debris : This is the from Explosion for planes crashing... 

		LAYER.draw();

		// Setup for the FPS counter
		var thisFrameTime = (thisLoop=new Date) - lastLoop;
		frameTime+= (thisFrameTime - frameTime) / filterStrength;
		lastLoop = thisLoop;
	}
function Debris()
	{
		// var X = x, Y = y, Dx = dx, Dy = dy, Time = time, TotalTime = time;
		// if (IS_MOBILE || getFPS() < FPS_TOO_LOW) TotalTime = TotalTime / 5;

		var This = this;
		this.update = function () {
			// if(Time-- > 0) {
			// 	X += Dx;
			// 	Y += Dy;

			// 	if (WORLD_WRAP)
			// 	{
			// 		if (X > WIDTH) X -= WIDTH; // if you reach the right side
			// 		else if (X < 0) X += WIDTH; // if you reach the left side

			// 		if (Y > HEIGHT - DRAW_BANNER_HEIGHT) Y = Math.abs(Y - HEIGHT); // If you reach the bottom... set you back at the top
			// 		else if (Y - DRAW_BANNER_HEIGHT < 0) Y = Math.abs(Y + (HEIGHT - DRAW_BANNER_HEIGHT) - 20); // If you reach the top (this works)... set you back at the bottom
			// 	}

			// 	Smokes.add(new Smoke(X, Y, 1, 7, 15, 150 * (Time / TotalTime)));
			// } else {
			// 	DebrisSet.remove(This);
			// }
		}
	}
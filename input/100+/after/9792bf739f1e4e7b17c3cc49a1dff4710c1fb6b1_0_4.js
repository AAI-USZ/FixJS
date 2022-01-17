function Debris()
	{
		var X,Y,Dx,Dx,Time,TotalTime;
		var smoked = false;
		this.inUse = false; // True if the object is currently in use

		this.init = function(){
			// Nothing for Debris at the moment
		};

		this.clear = function(){
			this.inUse = false;
		};

		this.spawn = function(x, y, dx, dy, time, redness){
			X = x, Y = y, Dx = dx, Dy = dy, Time = time, TotalTime = time;
			smoked = false;
			this.inUse = true;
		};

		this.use = function(){
			if(smoked) return true;
			this.update();
			return false;
		};    

		this.update = function(){        
			if(smoked) return;

			if(Time-- > 0)
			{
				X += Dx;
				Y += Dy;
				if(X > WIDTH) X -= WIDTH;
				else if(X < 0) X += WIDTH;

				if(Y > HEIGHT) Y = Math.abs(Y - HEIGHT);
				else if(Y < 0) Y = Math.abs(Y + HEIGHT);

				Smokes.get(X,Y,1,7,7,150 * (Time/TotalTime));
			}
			else
				SmokedOut();

		};

		function SmokedOut()
		{
			if(!smoked)
				smoked = true;
		}
	}
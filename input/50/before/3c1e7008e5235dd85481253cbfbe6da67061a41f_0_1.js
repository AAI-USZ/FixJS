function(point, isColliding) {
	    if (point.GetFixtureA().GetUserData() == 'myFeet' || point.GetFixtureB().GetUserData() == 'myFeet')  {
	        this.me.onFootSensorDetection(isColliding);
	    }
	}
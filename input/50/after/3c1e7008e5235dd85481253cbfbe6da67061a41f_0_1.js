function(point, isColliding) {
	    if (point.GetFixtureA().GetUserData() == Constants.COLLISION_IDENTIFIER_FOOTSENSOR
	     || point.GetFixtureB().GetUserData() == Constants.COLLISION_IDENTIFIER_FOOTSENSOR)  {

	        this.me.onFootSensorDetection(isColliding);
	    }
	}
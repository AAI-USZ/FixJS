function(include_cross_hair) {
		// include cross hair canvas or not
		if (typeof(include_cross_hair) != 'boolean' || include_cross_hair == true) {
			this.include_cross_hair = true;
		} else {
			this.include_cross_hair = false;
		}
	}
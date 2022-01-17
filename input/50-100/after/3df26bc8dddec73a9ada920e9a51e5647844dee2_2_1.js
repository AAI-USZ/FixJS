function nd(time) {

	if (olLoaded && !isExclusive()) {

		hideDelay(time);  // delay popup close if time specified



		if (o3_removecounter >= 1) { o3_showingsticky = 0 };

		

		if (o3_showingsticky == 0) {

			o3_allowmove = 0;

			if (over != null && (o3_compatmode ? 1 : o3_timerid == 0)) runHook("hideObject", FREPLACE, over);

		} else {

			o3_removecounter++;

		}

	}

	

	return true;

}
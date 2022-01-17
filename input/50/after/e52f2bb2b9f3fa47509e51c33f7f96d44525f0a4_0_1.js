function (i) {
			if (appIsBuilt === false) {
				prepareApp(i);
			} else {
				return false;
			}
		}
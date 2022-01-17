function(i, c) {
		//XXX use normalized uri
		if (c.uri === pageHref) {
			mustSkipContext = true;
			return false; //break
		}
	}
function(i, c) {
			if (getDomain(c.uri) === pageDomain) {
				primaryContext = c;
				return false; //break
			}
		}
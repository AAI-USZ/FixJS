function() {
		// check last inserted
		if(lastInserted && lastInserted.readyState == "interactive"){
			return lastInserted;
		}
		return null;
	}
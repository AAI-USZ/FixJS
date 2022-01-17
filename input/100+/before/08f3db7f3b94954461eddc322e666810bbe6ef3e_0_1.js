function(sessionId, status, value) {
		var result = {};
		result.sessionId = sessionId;
		result.status = status;
		var res = {};
		try {
			if (value && value.type && (value.type() === "UIAElementArray")) {
				res.ref = value.reference();
				res.type = value.type();
				res.length = value.length;
				log("array : "+  JSON.stringify(value));
				log("[3] : "+  value[3].name());
			} else if (value && value.type) {
				res.ref = value.reference();
				res.type = value.type();
			} else {
				res = value;
				log("value: "+value);
			}
			result.value = res;
		} catch (err) {
			result.value = err;
		}

		var json = JSON.stringify(result);
		return json;
	}
function (relid) {
		return typeof relid === "number" || parseInt(relid, 10).toString() === relid;
	}
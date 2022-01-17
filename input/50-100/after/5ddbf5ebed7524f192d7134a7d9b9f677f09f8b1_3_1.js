function doesOperate() {
	if (logletBaseURL) {
		try {
		if (getServer(logId, docId + "+" + name, logletBaseURL + "operates.php") == "okay") {
			return true;
		}
		} catch (err) {
			return false;
		}
	}
	return false;
}
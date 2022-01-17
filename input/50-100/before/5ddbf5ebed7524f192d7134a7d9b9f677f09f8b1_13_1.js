function doesOperate() {
	if (logletBaseURL) {
		if (getServer(logId, docId + "+" + name, logletBaseURL + "operates.php") == "okay") {
			return true;
		}
	}
	return false;
}
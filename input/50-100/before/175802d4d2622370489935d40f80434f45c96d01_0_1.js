function formatToURL(hash) {
	if (TDConfig("rest.port") == 80) { return "http://" + TDConfig("rest.host") + "/" + hash ; }
	else { return "http://" + TDConfig("rest.host") + ":" + TDConfig("rest.port") + "/" + hash ; }
}
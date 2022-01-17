function formatToURL(hash) {
	if (TDConfig("rest.port") == 80 && TDConfig("rest.port") != (process.env.PORT || TDConfig("rest.port"))) { return "http://" + TDConfig("rest.host") + "/" + hash ; }
	else { return "http://" + TDConfig("rest.host") + ":" + TDConfig("rest.port") + "/" + hash ; }
}
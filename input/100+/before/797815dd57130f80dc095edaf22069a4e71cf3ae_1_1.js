function initialize(pzhConnection, jid, rpcHandler) {
	connection = pzhConnection;
	
	var geoLocationFeature = webinosFeatures.factory[webinosFeatures.NS.GEOLOCATION](rpcHandler);
	geoLocationFeature.local = true;
	geoLocationFeature.shared = false;
	geoLocationFeature.device = jid;
    geoLocationFeature.owner = jid.split("/")[0];
	geoLocationFeature.uplink = connection;
    
	//TODO here goes the RPC stuff
	// should result in a call to geoLocationFeature.invoke(payload);

	var get42Feature = webinosFeatures.factory[webinosFeatures.NS.GET42](rpcHandler);
	get42Feature.local = true;
	get42Feature.shared = false;
	get42Feature.device = jid;
    get42Feature.owner = jid.split("/")[0];
	get42Feature.uplink = connection;

	//TODO here goes the RPC stuff
	// should result in a call to remoteAlertFeature.invoke(payload);

	features[geoLocationFeature.id] = geoLocationFeature;
	features[get42Feature.id] = get42Feature;
}
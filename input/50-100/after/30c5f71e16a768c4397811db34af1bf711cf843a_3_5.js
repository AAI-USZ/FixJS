function resSuccess(res,hashcode) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(TDShortener.formatToURL(hashcode));
	//Check for metrics availability
	if (TDConfig("metrics")) {
		//metricString,statusCode,typeString,placeString,callback
		var Metrics = require('./TDMetrics.js')("Status 200","200","Info","/create/",function (resp,ok) { });
	}
}
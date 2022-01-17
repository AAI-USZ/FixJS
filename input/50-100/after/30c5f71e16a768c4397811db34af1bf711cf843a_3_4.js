function dieConflict(res,hashcode) {
	//conflict status code
	res.writeHead(409, {'Content-Type': 'text/plain'});
	res.end(hashcode);
	//Check for metrics availability
	if (TDConfig("metrics")) {
		//metricString,statusCode,typeString,placeString,callback
		var Metrics = require('./TDMetrics.js')("Status 409","409","Error " + hashcode,"/create/",function (resp,ok) { });
	}
}
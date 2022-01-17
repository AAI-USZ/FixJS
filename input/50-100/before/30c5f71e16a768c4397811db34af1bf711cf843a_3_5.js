function redirect(res,toURL) {
	//Check if have protocol
	if (!toURL.match("http://") && !toURL.match("https://")) { toURL = "http://" + toURL; }
	//Do it
	res.writeHead(302, {'location': toURL});
	res.end();
	//	metricString,statusCode,typeString,placeString,callback
	var Metrics = require('./TDMetrics.js')("Status 302","302","Info","/XXXXXXXX",function (resp,ok) { });
}
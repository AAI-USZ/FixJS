function dieRequest(res) {
	res.writeHead(202);
	fs.readFile("./application/index.html",function (err,data) {
		if (!err && data) { res.end(data); }	
		else res.end();
	});
	//Check for metrics availability
	if (TDConfig("metrics")) {
		//metricString,statusCode,typeString,placeString,callback
		var Metrics = require('./TDMetrics.js')("Status 202","202","Info","/index.html",function (resp,ok) { });
	}
}
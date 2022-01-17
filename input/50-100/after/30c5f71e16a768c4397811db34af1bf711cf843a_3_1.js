function dieInFile(res,filePath) {
	res.writeHead(201);
	fs.readFile("./application" + filePath,function (err,data) {
		if (!err && data) { res.end(data); }	
		else res.end();
	});
	//Check for metrics availability
	if (TDConfig("metrics")) {
		//metricString,statusCode,typeString,placeString,callback
		var Metrics = require('./TDMetrics.js')("Status 201","201","Info",filePath,function (resp,ok) { });
	}
}
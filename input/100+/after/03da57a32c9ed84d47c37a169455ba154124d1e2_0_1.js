function JSss(_bucketID,_AWSAccessKeyID,_AWSSecretAccessKey,fileName) {
	//self
	self = this ;
	//Checks
	if (!_bucketID) {
		var errMsg = "_bucketID *REQUIRED* parameter is missing;";
		console.error(errMsg);
		self.emit("error",errMsg);/*stills emitting error, so an exception will be raise*/
		self.emit("jsss-end");
		return;
	}else if (!_AWSAccessKeyID) {
		var errMsg = "_AWSAccessKeyID *REQUIRED* parameter is missing;";
		console.error(errMsg);
		self.emit("error",errMsg);/*stills emitting error, so an exception will be raise*/
		self.emit("jsss-end");
		return;
	}else if (!_AWSSecretAccessKey) {
		var errMsg = "_AWSSecretAccessKey *REQUIRED* parameter is missing;";
		console.error(errMsg);
		self.emit("error",errMsg);/*stills emitting error, so an exception will be raise*/
		self.emit("jsss-end");
		return;
	}else if (!fileName) {
		var errMsg = "fileName *REQUIRED* parameter is missing;";
		console.error(errMsg);
		self.emit("error",errMsg); /*stills emitting error, so an exception will be raise*/
		self.emit("jsss-end");
		return;
	}
	
	//Get API
	self.fileName = fileName;
	self.uploadChunks = [];
	self.S3Api = require("./S3Api.js")(_bucketID,_AWSAccessKeyID,_AWSSecretAccessKey);
	//AddListener newListener 
	self.addListener("newListener",function (event,listFunction) {
		switch (event) {
			case "jsss-ready":{ this.getReady(); } break;
			default: {} break;
		}
	});
}
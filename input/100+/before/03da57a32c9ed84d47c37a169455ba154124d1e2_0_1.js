function JSss(_bucketID,_AWSAccessKeyID,_AWSSecretAccessKey,fileName) {
	//self
	self = this ;
	//Checks
	if (!_bucketID) {
		self.emit("error","_bucketID *REQUIRED* parameter is missing;");/*stills emitting error, so an exception will be raise*/
		self.emit("jsss-end");
		return;
	}else if (!_AWSAccessKeyID) {
		self.emit("error","_AWSAccessKeyID *REQUIRED* parameter is missing;");/*stills emitting error, so an exception will be raise*/
		self.emit("jsss-end");
		return;
	}else if (!_AWSSecretAccessKey) {
		self.emit("error","_AWSSecretAccessKey *REQUIRED* parameter is missing;");/*stills emitting error, so an exception will be raise*/
		self.emit("jsss-end");
		return;
	}else if (!fileName) {
		self.emit("error","fileName *REQUIRED* parameter is missing;"); /*stills emitting error, so an exception will be raise*/
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
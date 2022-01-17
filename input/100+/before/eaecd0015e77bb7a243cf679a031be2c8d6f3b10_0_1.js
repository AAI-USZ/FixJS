function(){
		var params = this.get("request").path.split("?");
		var path = params.shift().split("/")
		var filename = path.pop();
		this.set("filename", filename==="" ? "/" : filename );
		this.set("fullpath", this.get("request").scheme + "://" + this.get("request").host + ":" + this.get("request").port + path.join("/") + "/" );
	}
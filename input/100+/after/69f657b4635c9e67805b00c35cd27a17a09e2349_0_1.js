function(url,relativeTo,callback){
	this.loading=true;
	if(!callback) callback=this.loaded;
	if(!relativeTo && this.relativeTo) relativeTo=this.relativeTo;
	url=this.getAbsolutePath(url,relativeTo);
	if(!this.relativeTo) this.relativeTo=url;
	var req = new XMLHttpRequest();
	var that=this;
	if(req) {
		req.overrideMimeType("text/plain; charset=x-user-defined");
		req.onreadystatechange = function() {
			if(this.readyState  == 4)
			{
				if(this.status  == 200 || this.status==0){
					that.loading=false;
					callback.call(that,url,this.responseText);
				}else{ 
					GLGE.error("Error loading Document: "+url+" status "+this.status);
				}
			}
		};
		req.open("GET", url, true);
		req.send("");
	}	
}
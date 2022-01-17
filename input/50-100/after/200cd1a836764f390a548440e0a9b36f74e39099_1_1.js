function(str, callback){
	if(this.state > 0){
		this.frame.contentWindow.postMessage(str, '*');
		this.state = 2;
	} else this.stack.push(str);
	
	if(typeof callback == "function") callback();
	//this.callback.once = callback || function(){};
}
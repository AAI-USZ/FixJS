function(attributes, options){
	this.browser = new Browser();
	
	this.initialize.apply(attributes);
	return {
		url : "http://dev.hirevoice.com:3333/",
		initialize : function(){
			console.log(this);
		},		
	}
}
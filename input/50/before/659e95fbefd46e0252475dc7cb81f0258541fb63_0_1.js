function(input) {
	  return input.replace(/&lt;?/g,"<").replace(/&gt;?/g,">").replace(/&amp;?/g,"&");
	  //return input;
	}
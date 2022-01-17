function(input) {
	  input = input.replace(/&lt;?/g,"<");
	  input = input.replace(/&gt;?/g,">");
	  input = input.replace(/&amp;?/g,"&");
	  //return input.replace(/&lt;?/g,"<").replace(/&gt;?/g,">").replace(/&amp;?/g,"&");
	  return input;
	}
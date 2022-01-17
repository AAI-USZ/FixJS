function appendMagic() {
	
	// Set up some variables
	
	// Functions we'll need later
	function stripslashes(str) {
		str=str.replace(/\\'/g,'\'');
		str=str.replace(/\\"/g,'"');
		str=str.replace(/\\0/g,'\0');
		str=str.replace(/\\\\/g,'\\');
		str=str.substring(1,str.length-1);
		return str;
	}
	// CSV splitter thanks to http://www.greywyvern.com/?post=258
	String.prototype.splitCSV = function(sep) {
	  for (var foo = this.split(sep = sep || ","), x = foo.length - 1, tl; x >= 0; x--) {
	  	foo[x] = foo[x].replace(/ /g,''); // Modified to remove spaces from string too.
	    if (foo[x].replace(/"\s+$/, '"').charAt(foo[x].length - 1) == '"') {
	      if ((tl = foo[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
	        foo[x] = foo[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
	      } else if (x) {
	        foo.splice(x - 1, 2, [foo[x - 1], foo[x]].join(sep));
	      } else foo = foo.shift().split(sep).concat(foo);
	    } else foo[x].replace(/""/g, '"');
	  } return foo;
	};
	
	// Get the formatted content string
	var contentString = stripslashes($('#addOns').css('content'));
	
	var addOnArray = contentString.splitCSV();
	console.log(addOnArray);
	for (i=0;i<addOnArray.length;i++) {
		console.log('Item #'+i+' is '+addOnArray[i]);
		document.write('<script type="text/javascript" src="js/' + addOnArray[i] + '/script.js"></script>');
	}
	
	// Just paste the content string to the DOM
	document.write(contentString);
	
}
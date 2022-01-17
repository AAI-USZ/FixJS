function(str){
	var attr = {};
	str.replace(/([^= ]+)=(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|(\w+))/g, function(_,name,a,b,c){attr[name]=a||b||c});
	return attr;
}
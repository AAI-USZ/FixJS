function(str){
		var t = this;
  	if (str.substr(0,5)==="<?xml") {
  		var end=str.indexOf("?>"), a=XML.parse_attr(str.substring(5,end));
  		if (a.version) t.ver=a.version;
  		if (a.encoding) t.enc=a.encoding;
  		str=str.substr(end+2);
		}
  	t.str=str;
  	return t;
  }
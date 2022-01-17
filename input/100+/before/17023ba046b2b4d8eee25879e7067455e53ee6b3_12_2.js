function(str){
  	if (str.substr(0,5)==="<?xml") {
  		var end=str.indexOf("?>"), a=XML.parse_attr(str.substring(5,end))
  		if (a.version) this.ver=a.version
  		if (a.encoding) this.enc=a.encoding
  		str=str.substr(end+2)
		}
  	this.str=str
  	return this
  }
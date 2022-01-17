function getSrc(o){
    if (o.src)
	return o.src;
    if (o.data)
	return o.data;
    var params = o.getElementsByTagName("param");
    for (var i = 0; i < params.length; ++i){
	if (params[i].name == "movie"){
	    return params[i].value;
	}
    }
    return "";
}
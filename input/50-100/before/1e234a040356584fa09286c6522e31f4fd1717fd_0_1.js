function getSrc(o){
    if (o.src)
	return o.src;
    if (o.data)
	return o.data;
    return "";
}
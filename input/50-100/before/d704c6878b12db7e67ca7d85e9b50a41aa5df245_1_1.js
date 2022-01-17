function size(to_count) {
	var element_count = 0;
	for(var e in to_count) {
    	if(to_count.hasOwnProperty(e)) {
        	element_count++;
        }
    }
    return element_count;
}
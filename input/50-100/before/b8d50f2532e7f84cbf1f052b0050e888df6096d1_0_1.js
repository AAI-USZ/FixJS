function findVideoById(chan, id) {
    for(var x in videos[chan].video){
	if(videos[chan].video[x].id == id){
	    return Number(x); //if found return array pos
	}
    }
    return false; //not found
}
function(t) {
	if(Array.isArray(t)){
		for(var i in t){
			this.queue.push(t[i]);
		}
	}else{
		this.queue.push(t);
	}
    if (this.queue.length == 1) {
        this.dospotify.play(this.queue[0]);
    }
    this.emit('added', t);
}
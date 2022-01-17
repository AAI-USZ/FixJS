function(t) {
    var tmpql = this.queue.length;
	if(Array.isArray(t)){
		for(var i in t){
			this.queue.push(t[i]);
		}
	}else{
		this.queue.push(t);
	}
    if (tmpql == 0) {
        this.dospotify.play(this.queue[0]);
    }
    this.emit('added', t);
}
function(){
	if(this.id == 6) this.state = 2;
	else this.state = 1;

	for(var i = 0; i < this.stack.length; i++) this.send(this.stack[i]);
	this.stack = [];
}
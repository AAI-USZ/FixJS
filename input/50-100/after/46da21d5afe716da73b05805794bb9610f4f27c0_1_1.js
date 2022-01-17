function() {
	this.objects = this.level.objects;
	for(var i in this.objects){
		this.objects[i].mesh !== undefined ? this.scene.add(this.objects[i].mesh) : false;
	}
}
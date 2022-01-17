function(left, top, image, id, targetDialogue){
	console.log(id);
	this.targetDialogue = targetDialogue;
	this.targetDialogue.parent = this;
}
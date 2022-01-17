function JSONglosses(){
	var obj = {word:this.word};
	//eliminates extraneous bookkeeping properties and filters out zero-length annotation arrays
	if(this.textAnnotation.length){
		obj.textAnnotation = this.textAnnotation;
	}
	if(this.imageAnnotation.length){
		obj.imageAnnotation = this.imageAnnotation;
	}
	if(this.audioAnnotation.length){
		obj.audioAnnotation = this.audioAnnotation;
	}
	if(this.videoAnnotation.length){
		obj.videoAnnotation = this.videoAnnotation;
	}
	return obj;
}
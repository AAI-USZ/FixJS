function(){
	//console.log('adding part: ' + this.part + ' and id ' + this.objectId + ', parent: ' + JSON.stringify(this.parent.getPath()));
	var res = this.parent.getPath().concat(this.part);
	//res = res.concat([this.typeSchema.code]);
	if(this.objectId !== -1){
		res = res.concat([this.objectId]);
		//console.log('appended own id: ' + this.objectId);
	}
	//console.log('object returned path: ' + JSON.stringify(res));
	return res;
}
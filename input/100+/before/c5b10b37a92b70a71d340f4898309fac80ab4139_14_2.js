function(sourceParent){
	if(this.sourceParents === undefined) this.sourceParents = [];
	if(this.sourceParents.indexOf(sourceParent) === -1){
		this.sourceParents.push(sourceParent);
		//console.log('registered source parent for ' + this.typeSchema.name + ' ' + this.objectId);
	}
}
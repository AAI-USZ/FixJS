function(){
	if(this.objectId < 0) throw new Error('cannot get id of locally-created object yet - you need to provide a callback to your make(...) call to be notified when the id becomes available.')
	return this.objectId;
}
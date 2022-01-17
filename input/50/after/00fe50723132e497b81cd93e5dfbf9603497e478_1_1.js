function(user){
	if(typeof user == 'string'){
		return this.pipes[user];
	} else {
		return this.pipes[user.getPubid()];
	}
}
function(user){
	if (!this.users[user.uid]) return;
	this.users[user.uid].removeListener('locationupdate', this.onUserUpdate);
	delete this.users[user.uid];
	if (user.updateTimeout) clearTimeout(user.updateTimeout);
	this.sendUpdates(new BGTUpdate('quit', {user:{id:user.uid}}));
}
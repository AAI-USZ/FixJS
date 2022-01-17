function (e) {
	console.log(this);
	this.modifiedCell = e.target;
	if (this.commands.className == 'hidden')
		this.commands.className = 'displayed';
	else
		this.commands.className = 'hidden';
}
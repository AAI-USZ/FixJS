function () {
	this.nick (this.nickname);
	if (this.password) this.pass (this.password);

	this.user (this.username, this.realname);
}
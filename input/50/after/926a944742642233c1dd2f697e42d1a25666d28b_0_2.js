function () {
	this.nick_try (this.nickname);
	if (this.password) this.pass (this.password);

	this.user (this.username, this.realname);
}
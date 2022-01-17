function (nick) {
	this.nick (nick);

	this.once ("432", this.nick_alt); // Erroneous nickname
	this.once ("433", this.nick_alt); // Nickname in use
	this.once ("436", this.nick_alt); // Nickname collision
}
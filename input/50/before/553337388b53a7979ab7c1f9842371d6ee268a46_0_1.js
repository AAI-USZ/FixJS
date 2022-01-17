function (session) {
	this.createSession(session);
	this.checkCookie(session);
	this.adminInterface();
	this.showAllList();
	this.submitNewFile();
}
function () {
	var alts;

	alts = this.nickname_alts;

	if (alts.length) {
		this.nickname = alts.shift ();
	} else {
		// Generate guest nick
		this.nickname = "Guest" + (Math.random() * 9999 | 0);
	}
	this.nick_try (this.nickname);
}
function Pref(user) {
	this.username = user.getAttribute("username");
	this.personname = user.getAttribute("name");
	this.personnameLC = this.personname.toLowerCase();
	this.affiliation = user.getAttribute("affiliation");
	this.contact = user.getAttribute("contact");
}
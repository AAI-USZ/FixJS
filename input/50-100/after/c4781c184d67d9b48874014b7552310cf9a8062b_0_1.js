function Pref(user) {
	this.username = unnull(user.getAttribute("username"));
	this.personname = unnull(user.getAttribute("name"));
	this.personnameLC = this.personname.toLowerCase();
	this.affiliation = unnull(user.getAttribute("affiliation"));
	this.contact = unnull(user.getAttribute("contact"));

	function unnull(text) {
		return (text ? text : "");
	}
}
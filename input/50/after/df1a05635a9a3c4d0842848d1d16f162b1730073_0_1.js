function checkEmail(email) {
	if (email == "")
		return false;
	var regex = /^[a-zA-Z]([a-zA-Z0-9]|[\.\_\-][a-zA-Z0-9])*\@(([a-zA-Z0-9])+([\-\|\.][a-zA-Z0-9])?\.)+[a-zA-Z0-9]{2,255}$/;
	return (regex.test(email));
}
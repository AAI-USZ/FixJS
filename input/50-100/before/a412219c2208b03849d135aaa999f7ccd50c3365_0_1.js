function checkEmail()
{

	var str = document.forms[0].Email.value;
	if ((str == "") || (str.length < 1))
	{
		alert("\nPlease enter your email.")
		document.forms[0].Email.focus();
		return false;
	}
	return true;
}
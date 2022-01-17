function reallyLogout()
{
	var answer = confirm("Do you really want to logout?")
	if (answer)
	{
		window.location.href = 'logout.php';
	}
	else
	{
		//alert("Thats why you enabled that function in the first place right?")
	}
}
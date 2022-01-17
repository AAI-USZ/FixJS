function reallyDelete()
{
	var answer = confirm("Do you really want to delete this note?")
	if (answer)
	{
		deleteNote();
	}
	else
	{
		//alert("Thats why you enabled that function in the first place right?")
	}
}
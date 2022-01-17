function showForm(form)
{
	/* Noop click-handler on the page works around problem where
	   our main click handler doesn't get called in Mobile Safari */
	form.addEventListener("click",function(event){},true);
}
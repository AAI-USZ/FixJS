function()
{
	Titanium.API.info("You clicked the button");
	/*
	 * This event is caught by login.js and results in closing the tabGroup that contains
	 * this window.
	 */
	Ti.App.fireEvent('closeSignUpTabGroup'); 
}
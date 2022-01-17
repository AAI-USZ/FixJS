function(msg)
{
    Ti.UI.createAlertDialog({message: msg}).show();
	Ti.API.info('[ALERT]:' + msg);
}
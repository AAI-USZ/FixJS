function clientSaved(result)
{
	if(result != "Success")
	{
		alert("ERROR: " + result)
		if(result.match(/failed to connect/))
		{
			window.location=window.location
		}
	}
	else
	{
		uci = uciOriginal.clone()
		window.location=window.location
	}
	setControlsEnabled(true)
}
function query(queryHeader, queryText, buttonNameList, continueFunction )
{
	if( typeof(queryWindow) != "undefined" )
	{
		//opera keeps object around after
		//window is closed, so we need to deal
		//with error condition
		try
		{
			queryWindow.close();
		}
		catch(e){}
	}
	try
	{
		xCoor = window.screenX + 225;
		yCoor = window.screenY+ 225;
	}
	catch(e)
	{
		xCoor = window.left + 225;
		yCoor = window.top + 225;
	}
	var wlocation = "/query.sh";
	queryWindow = window.open(wlocation, queryHeader, "width=560,height=260,left=" + xCoor + ",top=" + yCoor );
	



	runOnEditorLoaded = function() 
	{
		updateDone=false;
		if(queryWindow.document != null)
		{
			if(queryWindow.document.getElementById("bottom_button_container") != null)
			{
				setChildText("query_header", queryHeader, null, null, null, queryWindow.document);
				setChildText("query_text", queryText, null, null, null, queryWindow.document);

				var buttonList = [];
				var bIndex;
				for(bIndex=0; bIndex < buttonNameList.length ; bIndex++)
				{
					b           = createInput("button", queryWindow.document);
					b.value     = buttonNameList[bIndex];
					b.className = "default_button"
					b.onclick   = function(btn){ queryWindow.close() ; continueFunction(btn.value) ; }
				       	queryWindow.document.getElementById("buttom_button_container").appendChild(b);
				}

				queryWindow.moveTo(xCoor,yCoor);
				queryWindow.focus();
				updateDone = true;
			}
		}
		if(!updateDone)
		{
			setTimeout( "runOnEditorLoaded()", 250);
		}
	}
	runOnEditorLoaded();
}
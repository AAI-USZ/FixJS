function formatPositionIntoLabel_Panel(positionObj, ghostExists)
	{
		if (!positionObj)
			return "";
		return getLabelForPanelIndex(mainOutline, positionObj.index) + ".";
	}
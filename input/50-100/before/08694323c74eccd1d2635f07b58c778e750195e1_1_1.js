function _getAttribute(aAttribute)
	{
		this.logInfo("@"+aAttribute+"="+this["@"+aAttribute]);
		return this.convertSpecialCharatersFromXML(this["@"+aAttribute]);
	}
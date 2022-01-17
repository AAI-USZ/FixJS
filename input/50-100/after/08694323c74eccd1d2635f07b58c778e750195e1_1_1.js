function _getAttribute(aAttribute, aDefaultValue)
	{
		if (this["@"+aAttribute]) {
			this.logInfo("@"+aAttribute+"="+this["@"+aAttribute]);
			return this.convertSpecialCharatersFromXML(this["@"+aAttribute]);
		}
		else {
			return aDefaultValue;
		}
	}
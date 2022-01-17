function()
	{
		// TODO: much more validation
		with(this.dom.documentElement)
		{
			if(tagName!="scxml")
				throw this.dom.documentURI+" is not an SCXML document"
			if(namespaceURI!="http://www.w3.org/2005/07/scxml")
				throw this.dom.documentURI+" is not a valid SCXML document (missing or incorrect xmlns)"
			if(hasAttribute("datamodel")
			&& getAttribute("datamodel") != "ecmascript")
				throw "'"+getAttribute("datamodel")+"' datamodel in"
				+ this.dom.documentURI +" is not supported by JSSCxml"
			if(hasAttribute("binding")
			&& getAttribute("binding") != "early"
			&& getAttribute("binding") != "late")
				throw "binding='"+getAttribute("binding")+"' in"
				+ this.dom.documentURI +" is not valid"
			this.lateBinding=(getAttribute("binding")=="late")
			this.datamodel._name=getAttribute("name")
		}
		// use just the filename for messages, URI can be quite long
		this.name=this.dom.documentURI.match(/[^/]+\.(?:sc)?xml/)[0]
	}
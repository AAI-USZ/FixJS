function(selector)
	{
		var type = selector.charAt(0);
		var element = selector.substring(1,selector.length);


		switch(type)
		{
			case '#':
				e = Quirk.select.id(element);
			break;
			case '.':
				e = Quirk.select.class(element);
			break;
			case '<':
				e = Quirk.select.new(selector);
			break;
			default:
				e = document.getElementsByTagName(selector)[0];
			break;
		}
		return new qObj(e);
	}
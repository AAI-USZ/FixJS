function(element)
	{
		if (element.substring) {
			this.text = element;
			this.domElement = document.createTextNode(element);
		}
		else {
			this.domElement = element;
			this.text = element.nodeValue;
		}
	}
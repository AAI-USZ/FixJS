function(anchor)
	{
		this.anchor = document.id(anchor)

		if (!this.anchor)
		{
			this.anchor = document.body.getElement(anchor)
		}

		this.reposition(true)
	}
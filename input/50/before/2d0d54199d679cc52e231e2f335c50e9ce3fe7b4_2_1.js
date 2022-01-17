function(anchor)
	{
		this.anchor = $(anchor)

		if (!this.anchor)
		{
			this.anchor = $(document.body).getElement(anchor)
		}
	}
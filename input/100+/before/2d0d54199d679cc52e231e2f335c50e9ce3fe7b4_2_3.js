function()
	{
		window.removeEvent('load', this.quickRepositionCallback)
		window.removeEvent('resize', this.quickRepositionCallback)
		window.removeEvent('scroll', this.repositionCallback)

		if (this.iframe)
		{
			var contentWindow = $(this.iframe.contentWindow)

			contentWindow.removeEvent('load', this.quickRepositionCallback)
			contentWindow.removeEvent('resize', this.quickRepositionCallback)
			contentWindow.removeEvent('scroll', this.repositionCallback)
		}

		if (this.options.animate)
		{
			this.tween.start(0).chain
			(
				function()
				{
					this.element.setStyle('display', '')
				}
			)
		}
		else
		{
			this.element.setStyle('display', '')
		}
	}
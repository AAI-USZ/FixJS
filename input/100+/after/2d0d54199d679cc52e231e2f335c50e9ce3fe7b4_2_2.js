function()
	{
		this.element.setStyles({ display: 'block', visibility: 'hidden' })

		window.addEvents
		({
			'load': this.quickRepositionCallback,
			'resize': this.quickRepositionCallback,
			'scroll': this.repositionCallback
		})

		if (this.iframe)
		{
			document.id(this.iframe.contentWindow).addEvents
			({
				'load': this.quickRepositionCallback,
				'resize': this.quickRepositionCallback,
				'scroll': this.repositionCallback
			})
		}

		this.reposition(true)

		if (this.options.animate)
		{
			this.tween.set(0)
			this.element.setStyle('visibility', 'visible')
			this.tween.start(1)
		}
		else
		{
			this.element.setStyle('visibility', 'visible')
		}
	}
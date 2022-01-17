function(el, options)
	{
		this.element = document.id(el)
		this.setOptions(options)
		this.arrow = this.element.getElement('.arrow')
		this.actions = this.element.getElement('.popover-actions')
		this.repositionCallback = this.reposition.bind(this, false)
		this.quickRepositionCallback = this.reposition.bind(this, true)

		this.iframe = this.options.iframe

		if (this.options.anchor)
		{
			this.attachAnchor(this.options.anchor)
		}

		this.tween = null

		if (this.options.animate)
		{
			this.tween = new Fx.Tween(this.element, { property: 'opacity', link: 'cancel', duration: 'short' })
		}

		if (this.options.fitContent)
		{
			this.element.addClass('fit-content')
		}

		this.element.addEvent('click', this.onClick.bind(this))

		if (this.options.visible)
		{
			this.show()
		}
	}
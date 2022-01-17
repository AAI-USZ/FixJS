function(messages, type)
	{
		var original, alert = this.element.getElement('div.alert-' + type) || new Element('div.alert.alert-' + type, { html: '<a href="#close" class="close">×</a>'})

		if (typeOf(messages) == 'string')
		{
			messages = [ messages ]
		}
		else if (typeOf(messages) == 'object')
		{
			original = messages

			messages = []

			Object.each
			(
				original, function(message, id)
				{
					if (typeOf(id) == 'string' && id != '_base')
					{
						var parent
						, field
						, el = this.element.elements[id]
						, i

						if (typeOf(el) == 'collection')
						{
							parent = el[0].getParent('div.radio-group')
							field = parent.getParent('.field')

							if (parent)
							{
								parent.addClass('error')
							}
							else
							{
								for (i = 0, j = el.length ; i < j ; i++)
								{
									el[i].addClass('error')
								}
							}
						}
						else
						{
							el.addClass('error')
							field = el.getParent('.field')
						}

						if (field)
						{
							field.addClass('error')
						}
					}

					if (!message || message === true)
					{
						return
					}

					messages.push(message)
				},

				this
			)
		}

		if (!messages.length)
		{
			return
		}

		messages.each
		(
			function(message)
			{
				alert.adopt(new Element('p', { html: message }))
			}
		)

		if (!alert.parentNode)
		{
			alert.inject(this.element, 'top')
		}
	}
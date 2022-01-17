function()
	{
		var div;
		
		// A hidden div created in order to measure the width of the text
		if (!$('__resizeable_textbox_measure_div'))
		{
			div = new Element('div', { id: '__resizeable_textbox_measure_div' })
			div.setStyle({
				position: 'absolute',
				top: '-1000px',
				left: '-1000px'
			});
			$(document.body).insert(div);
		}
		else
		{
			div = $('__resizeable_textbox_measure_div');
		}

		return div.setStyle({
			fontSize: this.el.getStyle('font-size'),
			fontFamily: this.el.getStyle('font-family')
		});
	}
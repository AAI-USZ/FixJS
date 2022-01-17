function(e)
	{
		e.preventDefault()

		var section = $(this).closest('section').data('section')
		var elems
		var torrents_list = $('#torrents').children('.content').children()
		var selector = ''

		switch(section)
		{
			case 'torrents':
				selector = $(this).data('show')
				if(selector.length <= 0)
					selector = ''
				break

			case 'labels':
				var label = $(this).data('label')
				if(label.length > 0)
					selector = '[data-label=' + label + ']'
				break
		}

		elems = selector.length > 0 ? torrents_list.filter(selector) : torrents_list
		
		torrents_list.not(elems).animate({
			scale: 0.9,
			opacity: 0,
			height: 0
		}, 150, function()
		{
			$(this).addClass('hidden')
		})

		elems.css('height', 75).removeClass('hidden').animate({
			opacity: 1,
			scale: 1
		}, 150)
	}
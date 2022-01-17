function disableSection(section)
	{
		section.addClass('sectionDisabled');
		/*section.find('.btn, input').each(function()
		{
			$(this).attr('disabled', true);
		});*/
		
		section.siblings('ul').children('li').eq( $(section).index()-1).addClass('sectionDisabled');
	}
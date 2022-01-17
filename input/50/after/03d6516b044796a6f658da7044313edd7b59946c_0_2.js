function enableSection(section)
	{
		section.removeClass('sectionDisabled');
		/*section.find('.btn, input').each(function()
		{
			$(this).removeAttr('disabled');
		});*/
		
		section.siblings('ul').children('li').eq( $(section).index()-1).removeClass('sectionDisabled');
	}
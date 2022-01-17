function ()
	{
		if (selected > progress_scroll)
			{
				progress_scroll = selected;
			}
		
		if (progress_scroll - 1 > 0)
		{
			progress_scroll -= 1;
		}
		
		
		
		$(".bar").scrollTo($(".bar img[id='m_"+progress_scroll+"']"), 0, {axis:"x"});
	}
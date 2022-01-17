function ()
	{
		if (progress_scroll - 30 >= 0)
		{
			progress_scroll -= 30;
		}
		$(".bar").scrollTo(progress_scroll, 250, {axis:"x"});
	}
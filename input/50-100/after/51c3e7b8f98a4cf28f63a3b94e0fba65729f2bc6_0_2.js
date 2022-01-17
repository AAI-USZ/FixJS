function ()
			{
								
				if (progress_scroll - 1 >= 0)
				{
					progress_scroll -= 1;
				}
				
				$(".bar").scrollTo($(".bar img[id='m_"+progress_scroll+"']"), 0, {axis:"x"});
			}
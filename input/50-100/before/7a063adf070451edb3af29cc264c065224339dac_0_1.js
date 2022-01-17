function scroll_handler()
		{
			
			scrTop = scrolling_container.scrollTop();
			wndHeight = scrolling_container.height();
			
			curScrOffset = scrTop + wndHeight;
			
			if (curScrOffset >= get_scroll_treshold()) {
				
				paginate(curScrOffset);
			}
		}
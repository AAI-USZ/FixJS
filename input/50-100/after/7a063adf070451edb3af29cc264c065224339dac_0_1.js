function scroll_handler()
		{
			
			// the way we calculate if have to load the next page depend on which container we have
			if(opts.scrollInContainer){
				scrTop = scrolling_container.offset().top;
			}else{				
				scrTop = scrolling_container.scrollTop();
			}

			wndHeight = scrolling_container.height();

			curScrOffset = scrTop + wndHeight;
			
			if (curScrOffset >= get_scroll_treshold()) {
				paginate(curScrOffset);
			}

		}
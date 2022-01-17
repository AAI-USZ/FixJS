function(e, dir) {
					if(dir == 'up' && $(this).attr('id') != 'slide1') slide = $(this).prev();
					else slide = $(this);
					index = $(".slide").index($(this))
					$(o.top_links).removeClass('current');
					$($(o.top_links).get(index)).addClass('current');
				}
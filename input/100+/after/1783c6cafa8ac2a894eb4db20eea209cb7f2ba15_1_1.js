function(index, iframe) {
					var area = $(iframe).parent().parent();
					var iframe_wrapper = $(iframe).parent();
					
					$(area).attr("zoom",increase);
          $(iframe).attr("style",VISH.SlidesUtilities.getZoomInStyle(increase));
					
					//Width differente between original size and new size.
//					var widthDelta = $(iframe_wrapper).width()*(1-(1/increase));
					var scrollLeft = $(area).attr("scrollLeftOrigin");
//					var newScrollLeft = scrollLeft * increase + widthDelta;
          var newScrollLeft = scrollLeft * increase;
					
					var scrollTop = $(area).attr("scrollTopOrigin");
					var newScrollTop = scrollTop * increase;
					
					$(area).attr("scrollLeft",newScrollLeft);
					$(area).attr("scrollTop",newScrollTop);
          $(iframe_wrapper).scrollLeft(newScrollLeft);
					$(iframe_wrapper).scrollTop(newScrollTop);
      }
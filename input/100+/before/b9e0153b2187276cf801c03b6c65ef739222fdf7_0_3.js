function(event) {

			var offset = box.offset();

			if(options.fixed){

				offset.left -= $(window).scrollLeft();

				offset.top -= $(window).scrollTop();

			}

			draging = [event.pageX - offset.left, event.pageY - offset.top];

		}
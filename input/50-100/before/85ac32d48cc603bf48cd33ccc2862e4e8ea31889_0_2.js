function() {
				var w = 0,
				outer = "<div id='scrollTest' style='overflow: scroll;'></div>";
				$('body').append(outer);
  				var el = document.getElementById('scrollTest');
  				w = el.offsetWidth - el.scrollWidth;
				$('#scrollTest').remove();
				return w;
			}
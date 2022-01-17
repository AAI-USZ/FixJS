function() {
				var w = 0,
					testDiv = "<div id='scrollTest' style='overflow: scroll;'></div>";
				$('body').append(testDiv);
  				var el = document.getElementById('scrollTest');
  				w = el.offsetWidth - el.scrollWidth;
				$('#scrollTest').remove();
				return w;
			}
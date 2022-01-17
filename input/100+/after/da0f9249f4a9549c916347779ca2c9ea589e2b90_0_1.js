function() {
				var w = 0,
				outer = "<div id='scrollTest'><form action='#'' id='f'><div><textarea cols='20' rows='2' name='t'></textarea></div></form></div>";
				$('body').append(outer);
				var t = document.forms.f.elements.t;
  				t.wrap = 'off'; w = t.offsetHeight;
  				t.wrap = 'soft'; w -= t.offsetHeight;
  				if(w==0){
  					$('#f').remove();
  					$('#scrollTest').css('overflow', 'scroll');
  					var el = document.getElementById('scrollTest');
  					w = el.offsetWidth - el.scrollWidth;
  				}
				$('#scrollTest').remove();
				return w;
			}
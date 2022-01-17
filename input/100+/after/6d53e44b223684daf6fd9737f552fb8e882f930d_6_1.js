function() {
			var i, curr,
				elements = [],
				self = this,
				colors = self._colors,
				len = colors.length,
				el = self.$el;

			for ( i = 0; i < len; ++i ) {
				curr = document.createElement('div');
				curr.className = 'color';
				curr.style['background-color'] = colors[i];
				curr.innerHTML = '<span class="alpha">'+colors[i].alpha().toFixed(1)+'</span>';
				elements.push( curr );
			}

			elements.length > 0 && el.html( elements );
		}
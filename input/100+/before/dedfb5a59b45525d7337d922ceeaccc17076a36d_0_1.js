function(toSelected){
			var slides = this.firstElementChild;
			if (!slides || !slides.children.length || slides.tagName.toLowerCase() != 'x-slides') return;
			
			var	children = xtag.toArray(slides.children),
				size = 100 / (children.length || 1),
				orient = this.getAttribute('data-orientation') || 'x',
				style = orient == 'x' ? ['width', 'height'] : ['height', 'width'];
			
			xtag.skipTransition(slides, function(){
				slides.style[style[1]] =  '100%';
				slides.style[style[0]] = children.length * 100 + '%';
				slides.style[transform] = 'translate' + orient + '(0%)';
				children.forEach(function(slide){				
					slide.style[style[0]] = size + '%';
					slide.style[style[1]] = '100%';
				});
			});
			
			if (toSelected) {
				var selected = slides.querySelector('[selected="true"]');
				if (selected) slide(this, children.indexOf(selected) || 0);
			}
		}
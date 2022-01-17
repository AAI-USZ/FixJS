function(){
			var ancestor = this.parentNode.parentNode;
			if (ancestor.tagName.toLowerCase() == 'x-slideshow') init.call(ancestor, true);
		}
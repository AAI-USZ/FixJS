function(context) {
			var fragment = context.createDocumentFragment();
			
			this.children = this.children || [];
			this.children.forEach(function(c) {
				fragment.appendChild(c._render(context));
			});
			
			return fragment;
		}
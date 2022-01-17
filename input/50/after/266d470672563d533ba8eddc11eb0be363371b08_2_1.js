function(subcontext, subtemplate) {
				result = subtemplate.render({ value: 'my value' });
				return this.createDocumentFragment();
			}
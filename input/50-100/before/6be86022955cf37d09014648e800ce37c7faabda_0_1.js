function(title) {
				var form = this.parents('form');
				form.find('input[name=MetaTitle], input[name=MenuTitle]').val(title);
			}
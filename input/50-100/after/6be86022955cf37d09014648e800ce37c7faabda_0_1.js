function(title, origTitle) {
				// Update these fields only if their value was originally the same as the title
				this.parents('form').find('input[name=MetaTitle], input[name=MenuTitle]').each(function() {
					var $this = $(this);
					if($this.val() == origTitle) {
						$this.val(title);
						// Onchange bubbling didn't work in IE8, so .trigger('change') couldn't be used
						if($this.updatedRelatedFields) $this.updatedRelatedFields();
					}
				});
			}
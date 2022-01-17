function() {
			if (this.options.before_page_id) {
				extra_field = $('<input type="hidden" name="before_page_id" />');
				extra_field.val(this.options.before_page_id);
				this.form.append(extra_field);
			}

			if (this.options.below_page_id) {
				extra_field = $('<input type="hidden" name="below_page_id" />');
				extra_field.val(this.options.below_page_id);
				this.form.append(extra_field);
			}

			// automatically slugify the title field
			$('#id_title').attr('autocomplete', 'off');
			$('#id_title').slugify('#id_url');

		}
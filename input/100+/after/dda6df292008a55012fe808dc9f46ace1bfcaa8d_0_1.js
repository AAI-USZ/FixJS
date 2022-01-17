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

			var $url_field = $('#id_url');
			var $title_field = $('#id_title');

			// remove autocompletion from title field
			$title_field.attr('autocomplete', 'off');

			// automatically slugify the title field when the url field is initially empty
			if (!$url_field.val()) {
				$title_field.slugify($url_field);
			}

			// automatically (re)start slugifying the title field when the url field is emptied
			$url_field.change(function() {
				if (!$url_field.val()) {
					$title_field.slugify($url_field);
				}
			});
		}
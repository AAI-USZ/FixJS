function () {
			if ($('#wp-biographia-display-archives-posts').attr('checked')) {
				$('#wp-biographia-display-author-archives-posts').attr('checked', true);
				$('#wp-biographia-display-category-archives-posts').attr('checked', true);
				$('#wp-biographia-display-date-archives-posts').attr('checked', true);
				$('#wp-biographia-display-tag-archives-posts').attr('checked', true);
			}
			
			else {
				$('#wp-biographia-display-author-archives-posts').attr('checked', false);
				$('#wp-biographia-display-category-archives-posts').attr('checked', false);
				$('#wp-biographia-display-date-archives-posts').attr('checked', false);
				$('#wp-biographia-display-tag-archives-posts').attr('checked', false);
			}
			$('#wp-biographia-archive-posts-container').toggle('slow');
		}
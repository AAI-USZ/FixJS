function() {
		var t = $(this),
			spinner = t.siblings('.ajax-feedback'),
			boxes = $('.variation_checkboxes input:checked'),
			values = [],
			post_data = {
				action : 'wpsc_update_variations',
				description : $('#content_ifr').contents().find('body').html(),
				additional_description : $('textarea#additional_description').text(),
				name : $('input#title').val(),
				product_id : $('input#product_id').val()
			},
			ajax_callback = function(response){
				$('div#wpsc_product_variation_forms table.widefat tbody').html(response);
				spinner.toggleClass('ajax-feedback-active');
			};

		boxes.each(function(){
			var t = $(this);
			post_data[t.attr('name')] = t.val();
		});

		post_data.edit_var_val = values;
		spinner.toggleClass('ajax-feedback-active');

		$.post(ajaxurl, post_data, ajax_callback);

		return false;
	}
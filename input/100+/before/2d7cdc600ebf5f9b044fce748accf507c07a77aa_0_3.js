function($){
	
	var container = $('#col-container');
	var ajaxResponse = $('#ajax-response');
	var destination = $('#destination');
	var origin = $('#origin');
	
	container.delegate('#doaction', 'click', function(e){
		var del = [];
		var data;
		var checked = $('.tbody-child input[type="checkbox"]:checked');
		checked.each(function(i){
			del.push($(this).data('origin'));
		});
		data = { shorturls: del, action: 'delete_bulk_short_urls' }
		$.post(ajaxurl, data, function(r){
			ajaxResponse.empty();
			var res = wpAjax.parseAjaxResponse(r, 'ajax-response');
			if( ! res )
				return;
			
			checked.fadeOut(300, function(){
				$(this).parents('tr').remove();
				$('input[type="checkbox"]').attr('checked', false);
			});
		});
	});
	
	container.delegate('#submit', 'click', function(e){
		var form = $(this).parents('form');
		var errors = [];
		
		if(!validateForm(form))
			return false;
		
		if(!is_valid_url(destination.val())){
			errors.push('The destination url provided is not a valid url.');
		}
		
		if(errors.length > 0){
			ajaxResponse.empty();
			var error_html = '<div class="error">';
			$.each(errors, function(i){
				error_html += '<p>'+errors[i]+'</p>';
			});
			error_html += '</div>';
			ajaxResponse.html(error_html);
		} else {
			$.post(ajaxurl, form.serialize(), function(r){
				ajaxResponse.empty();
				var res = wpAjax.parseAjaxResponse(r, 'ajax-response');
				if ( ! res )
					return;
				
				if(res.responses[0].supplemental.hasOwnProperty('row')){
					$('.wp_shorturls_table').append(res.responses[0].supplemental['row']);
					origin.val('');
					destination.val('http://');
				}
			});
		}
		
		e.preventDefault();
		return false;
	});
	
	
	
	
	function is_valid_url(str) {
		var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		return regexp.test(str);
	}
}
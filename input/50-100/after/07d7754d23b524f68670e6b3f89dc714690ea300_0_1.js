function(){
		$('#add_link_line').click(function(){
			var self = $(this);
			var lnk_count = $("input[name^='link_row']").length+1;
			var lnk		  = 'link_row[new_'+lnk_count+']';
			
			$('#link_row_container').append(
				'<input type="text" name="'+lnk+'" class="link_row"/>'
			).append(self);
			link_row_ct++;
		});
	}
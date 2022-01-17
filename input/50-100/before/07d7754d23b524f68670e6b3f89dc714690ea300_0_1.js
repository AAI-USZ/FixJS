function(){
			var spr_count = $("input[name^='speaker_row']").length+1;
			var spr		  = 'speaker_row[new_'+spr_count+']';
			
			$('#speaker_row_container').append(
				'<input type="text" name="'+spr+'" class="speaker_row"/>'
			);
			speaker_row_ct++;
		}
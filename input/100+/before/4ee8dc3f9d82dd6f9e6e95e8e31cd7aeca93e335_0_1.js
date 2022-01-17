function(data) {
		hideThrobber();
		
			
			$('#content-notepad .table-list').remove();
			$('#content-notepad').append('<table class="table-list">'+
									'<thead><th>Title</th></thead>'+
									'<tbody></tbody></table>');
			
			
			
			keys = sortNotes(data);
			
			if(keys.length == 0) {
				emptymsg = '<p id="notepad-empty">You don\'t have any notes yet! Click on the \'Add Note\' button above to add a new note!</p>';
				$('#content-notepad').append(emptymsg);
			}
			else {
				$('#notepad-empty').fadeOut().remove();
				
				for(var i=0; i < keys.length; i++)
				{
						insertNote(data[keys[i]]._id, data[keys[i]].title,
						data[keys[i]].note, data[keys[i]].created,
						data[keys[i]].modified);			
				}
			}
				
	}
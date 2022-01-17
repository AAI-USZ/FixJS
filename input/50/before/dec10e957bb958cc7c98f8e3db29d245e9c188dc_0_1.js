function(event, ui) {
				//when an option is selected:
				//put the text in the input field
				$('#project-select-ac').val(ui.item.label);
				//put the value in the hidden field
				$('#project-select-hidden').val(ui.item.value);
				//submit the form
				$('form[name=form_set_project]').submit();
				return false;
			}
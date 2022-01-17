function changeFilterConditionTextBoxID(){	
		$("#date_from", $('$("#filter_field"):focus').closest('div')).attr('id','filter_condition_textbox');
		$("#date_to", $('$("#filter_field"):focus').closest('div')).attr('id','filter_condition_textbox');
}
function supplyConditionOptions(fieldOption){
	$("#filter_condition", $('$("#filter_field"):focus').closest('div')).empty();
	
	if(fieldOption == ""){
		changeFilterConditionTextBoxID();
		$("#filter_condition", $('$("#filter_field"):focus').closest('div')).hide();
		$("#filter_condition_textbox", $('$("#filter_field"):focus').closest('div')).hide();		
	}
	
	if(fieldOption == "message type"){
		$("#filter_condition", $('$("#filter_field"):focus').closest('div')).show();
		$("#filter_condition_textbox", $('$("#filter_field"):focus').closest('div')).hide();
		$("#filter_condition", $('$("#filter_field"):focus').closest('div')).attr('name','filter_type').append(new Option("", ""));
		var typeConditionOptions = window.app.typeConditionOptions;
		$.each(typeConditionOptions, function(val, text) {
			$("#filter_condition", $('$("#filter_field"):focus').closest('div')).append(new Option(text, val));
		});
	}
	if(fieldOption == "message status"){
		$("#filter_condition", $('$("#filter_field"):focus').closest('div')).show();
		$("#filter_condition_textbox", $('$("#filter_field"):focus').closest('div')).hide();
		$("#filter_condition", $('$("#filter_field"):focus').closest('div')).attr('name','filter_status').append(new Option("", ""));
		var statusConditionOptions = window.app.statusConditionOptions;
		$.each(statusConditionOptions, function(val, text) {
			$("#filter_condition", $('$("#filter_field"):focus').closest('div')).append(new Option(text, val));
		});
	}
	if(fieldOption == "date from"){
		$("#filter_condition", $('$("#filter_field"):focus').closest('div')).hide();
		$("#filter_condition_textbox", $('$("#filter_field"):focus').closest('div')).attr('id','date_from').attr('name','filter_from').show().datepicker();		
	}
	if(fieldOption == "date to"){
		$("#filter_condition", $('$("#filter_field"):focus').closest('div')).hide();// we need to change id because the dtae picker will recognize only the id.
		$("#filter_condition_textbox", $('$("#filter_field"):focus').closest('div')).attr('id','date_to').attr('name','filter_to').show().datepicker();		
	}
	if(fieldOption == "participant phone"){
		changeFilterConditionTextBoxID();
		$("#filter_condition", $('$("#filter_field"):focus').closest('div')).hide();
		$("#filter_condition_textbox", $('$("#filter_field"):focus').closest('div')).attr('name','filter_phone').show().datepicker("destroy").removeClass("hasDatepicker");
	}
	if(fieldOption == "message content"){
		changeFilterConditionTextBoxID();
		$("#filter_condition", $('$("#filter_field"):focus').closest('div')).hide();
		$("#filter_condition_textbox", $('$("#filter_field"):focus').closest('div')).attr('name','filter_content').show().datepicker("destroy").removeClass("hasDatepicker");
	}
	
}
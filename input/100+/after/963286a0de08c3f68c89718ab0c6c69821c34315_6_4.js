function ts_ext_updateBudget(data) {
	var budget = data['activityBudgets']['budget'];
	// that is the case if we changed the project and no activity is selected
	if(isNaN(budget)) {
		budget = 0;
	}
	if($('#budget_val').val() != '') {
		budget+= parseFloat($('#budget_val').val());
	}
	budget-= data['timeSheetEntry']['budget'];
	$('#budget_activity').text(budget);
	var approved = data['activityBudgets']['approved'];
	// that is the case if we changed the project and no activity is selected
	if(isNaN(approved)) {
		approved = 0;
	}
	if($('#approved').val() != '') {
		approved+= parseFloat($('#approved').val());
	}
	approved-= data['timeSheetEntry']['approved'];
	$('#budget_activity_approved').text(approved);
	var budgetUsed = data['activityUsed'];
	if(isNaN(budgetUsed)) {
		budgetUsed = 0;
	}
    var durationArray= new Array();
    durationArray = $("#duration").val().split(/:|\./);
    if(end!=null && durationArray.length > 0 && durationArray.length < 4) {
        secs = durationArray[0]*3600;
        if(durationArray.length > 1)
            secs += (durationArray[1]*60);
        if(durationArray.length > 2)
        	secs += parseInt(durationArray[2]);
		var rate = $('#rate').val();
		if(rate != '') {
	    	budgetUsed+= secs/3600*rate;
			budgetUsed-=data['timeSheetEntry']['duration']/3600*data['timeSheetEntry']['rate'];
		}
    }
	$('#budget_activity_used').text(Math.round(budgetUsed,2));
}
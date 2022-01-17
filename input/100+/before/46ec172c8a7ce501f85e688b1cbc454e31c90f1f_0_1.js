function addForm(link) {
	// Copy the hidden form (with 'template-form' class) and
	// insert it at the end of all the forms.
	// Remove error messages and update all the form indices.

	var max_num_forms = 10;
	var formCount = parseInt($('#id_' + form_prefix + '-TOTAL_FORMS').val());
	console.log (formCount);

	// You can only submit a maximum of 10 subtasks
	if (formCount < max_num_forms) {
	    // Clone a form (without event handlers) from the template form
	    var currForm = $(".template-form:first").clone(false).get(0);
	    
	    // Set the index for the new form as formCount
	    var inner_txt = $(currForm).html().replace (/__prefix__/g, formCount);
	    // console.log (inner_txt);

	    $(currForm).html (inner_txt);

	    // Insert it before the add link
	    $(currForm).removeAttr('id')
		.hide()
		.insertBefore("#add")
		.slideDown(300);
        
	    // Add an event handler for the delete form link
	    $(currForm).find(".delete").click(function() {
		return deleteForm(this);
	    });

	    // This form should be visible
	    $(currForm).removeClass('template-form').addClass('visible-form');

	    // Update its heading
	    updateFormHeading (currForm);

	    // Update the total form count
	    $("#id_" + form_prefix + "-TOTAL_FORMS").val(formCount + 1);

        // Adding bootstrap datepicker
        $("#id_" + form_prefix + "-" + formCount + "-deadline").val("08/01/2012"); //Date set: Aug 1st, 2012. Set a date close to usage date for easier navigation
        $("#id_" + form_prefix + "-" + formCount + "-deadline").datepicker({
            format: 'mm/dd/yyyy'
        });

	} // End if
	else {
	    alert("Sorry, you can only enter a maximum of " + (max_num_forms - 1) + " Subtasks.");
	}
	return false;
    }
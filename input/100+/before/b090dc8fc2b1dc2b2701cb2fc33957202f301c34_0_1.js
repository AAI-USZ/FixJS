function(){
	var $form = $('#editform');
	filteredInputs($form).each(snapshotInputValue);
	$form.find('.nullf input[type=checkbox].nullf').change(nullFieldCheckBox).attr('title', 'Disable the checkbox If you`re going to leave the field as empty');	//Снимите отметку, чтобы оставить поле пустым (как NULL)
	$form.find('.nullf select:not(:has(option))').parent(0).find('input[type=checkbox].nullf').attr('checked', false).attr('disabled', true);
	$form.find('.nullf').find('input,textarea').filter(':not(input[type=checkbox].nullf)').focus(focusNearNullF);
	$form.find('.block_password input[type=checkbox][name$="[is_new]"]').change(checkboxNewPassword);

	$form.find('.time-panel').each(function() {
		var	$timePanel = $(this);
		var datePickerOpts = {
				onSelect: function(dateText, inst) {
					$timePanel.find('select[name$="[d]"]').val(parseInt(dateText.substr(3, 2)));
					$timePanel.find('select[name$="[m]"]').val(parseInt(dateText.substr(0, 2)));
					$timePanel.find('input[name$="[y]"]').val(dateText.substr(6, 4));
					return false;
				},
				changeYear: true
			};
		//If min or max validators were set
		if($form.find('.time-panel .calendar span.mindate'))
			datePickerOpts.minDate = new Date($form.find('.time-panel .calendar span.mindate').html()*1000);
		if($form.find('.time-panel .calendar span.maxdate'))
			datePickerOpts.maxDate = new Date($form.find('.time-panel .calendar span.maxdate').html()*1000);

		$timePanel.find('.calendar input').datepicker(datePickerOpts);
	});

	$form.submit(function() {
		filteredInputs($form).each(markChangedField);
		return true;
	});
}
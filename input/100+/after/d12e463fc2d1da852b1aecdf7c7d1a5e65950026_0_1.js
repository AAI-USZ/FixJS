function() {
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
	}
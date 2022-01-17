function(slave, master, func){
		var slaveId = getFieldId(slave, context);
		var masterId = getFieldId(master, $('#' + slaveId).closest('.form'));

		if ($('#' + slaveId).val() == ''){
			$('#' + masterId).keyup(function(e){
				// for most common cases
				if (func){
					var newVal = func($(this).val());
					$('#' + slaveId).val(newVal);
				}

			});
		}
		
		// setup ajax on blur to do server side processing if no javascript function exists
		if (!func){
			$('#' + masterId).blur(function(e){
				var url = __FUEL_PATH__ + '/' + module + '/process_linked';
				var parameters = {
					master_field:master, 
					master_value:$(this).val(), 
					slave_field:slave
				};
				$.post(url, parameters, function(response){
					$('#' + slaveId).val(response);
				});
			});
		}
		
	}
function(e){
				// for most common cases
				if (func){
					var newVal = func($(this).val());
					$('#' + slaveId).val(newVal);
				}

			}
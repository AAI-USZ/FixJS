function(context){
	
	var _this = this;
	var module = fuel.getModule();

	var getFieldId = function(refId, context){
		var $key = $('input[data-key="' + refId + '"]', context);
		var id = ($key.length) ? $key.attr('id') : $('#' + refId, context).attr('id');
		return id;
	}
	
	// needed for enclosure
	var bindLinkedKeyup = function(slave, master, func){
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

	// needed for enclosure
	var bindLinked = function(slave, master, func){
		if ($('#' + fuel.getFieldId(slave, context)).val() == ''){
			if (typeof(master) == 'string'){
				bindLinkedKeyup(slave, master, url_title);
			} else if (typeof(master) == 'object'){
				for (var o in master){
					var func = false;
					var funcName = master[o];
					var val = $('#' + fuel.getFieldId(o, context)).val();
					if (funcName == 'url_title'){
						var func = url_title;
					// check for function scope, first check local function, then class, then global window object
					} else if (funcName != 'url_title'){
						if (this[funcName]){
							var func = this[funcName];
						} else if (window[funcName]){
							var func = window[funcName];
						}
					}
					bindLinkedKeyup(slave, o, func);
					break; // stop after first one
				}
			}
		}
	}
	
	$('.linked', context).each(function(i){

		// go all the way up to the value containing element because error messages insert HTML that won't allow us to use prev()
		var linkedInfo = $(this).closest('.value').find('.linked_info').text();
		if (linkedInfo.length){
			bindLinked($(this).attr('id'), eval('(' + linkedInfo + ')'));
		}
	});
	
}
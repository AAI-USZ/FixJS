function(e) {
		e.preventDefault();
		var panelOptionsDiv = this.RESConfigPanelOptions;
		// first, go through inputs that aren't a part of a "table of options"...
		var inputs = panelOptionsDiv.querySelectorAll('input, textarea');
		for (var i=0, len=inputs.length;i<len;i++) {
			// save values of any inputs onscreen, but skip ones with 'capturefor' - those are display only.
			var notTokenPrefix = (inputs[i].getAttribute('id') != null) && (inputs[i].getAttribute('id').indexOf('token-input-') == -1);
			if ((notTokenPrefix) && (inputs[i].getAttribute('type') != 'button') && (inputs[i].getAttribute('displayonly') != 'true') && (inputs[i].getAttribute('tableOption') != 'true')) {
				// get the option name out of the input field id - unless it's a radio button...
				if (inputs[i].getAttribute('type') == 'radio') {
					var optionName = inputs[i].getAttribute('name');
				} else {
					var optionName = inputs[i].getAttribute('id');
				}
				// get the module name out of the input's moduleid attribute
				var moduleID = RESConsole.currentModule;
				if (inputs[i].getAttribute('type') == 'checkbox') {
					var optionValue = !!inputs[i].checked;
				} else if (inputs[i].getAttribute('type') == 'radio') {
					if (inputs[i].checked) {
						var optionValue = inputs[i].value;
					}
				} else {
					// check if it's a keycode, in which case we need to parse it into an array...
					if ((inputs[i].getAttribute('class')) && (inputs[i].getAttribute('class').indexOf('keycode') >= 0)) {
						var tempArray = inputs[i].value.split(',');
						// convert the internal values of this array into their respective types (int, bool, bool, bool)
						var optionValue = [parseInt(tempArray[0]), (tempArray[1] == 'true'), (tempArray[2] == 'true'), (tempArray[3] == 'true'), (tempArray[4] == 'true')];
					} else {
						var optionValue = inputs[i].value;
					}
				}
				if (typeof(optionValue) != 'undefined') {
					RESUtils.setOption(moduleID, optionName, optionValue);
				}
			}
		}
		// Check if there are any tables of options on this panel...
		var optionsTables = panelOptionsDiv.querySelectorAll('.optionsTable');
		if (typeof(optionsTables) != 'undefined') {
			// For each table, we need to go through each row in the tbody, and then go through each option and make a multidimensional array.
			// For example, something like: [['foo','bar','baz'],['pants','warez','cats']]
			for (var i=0, len=optionsTables.length;i<len;i++) {
				var moduleID = optionsTables[i].getAttribute('moduleID');
				var optionName = optionsTables[i].getAttribute('optionName');
				var thisTBODY = optionsTables[i].querySelector('tbody');
				var thisRows = thisTBODY.querySelectorAll('tr');
				// check if there are any rows...
				if (typeof(thisRows) != 'undefined') {
					// go through each row, and get all of the inputs...
					var optionMulti = [];
					var optionRowCount = 0;
					for (var j=0;j<thisRows.length;j++) {
						var optionRow = [];
						var cells = thisRows[j].querySelectorAll('td.hasTableOption');
						var notAllBlank = false;
						for (var k=0; k<cells.length; k++) {
							var inputs = cells[k].querySelectorAll('input[tableOption=true], textarea[tableOption=true]');
							var optionValue = null;
							for (var l=0;l<inputs.length;l++) {
								// get the module name out of the input's moduleid attribute
								// var moduleID = inputs[l].getAttribute('moduleID');
								if (inputs[l].getAttribute('type') == 'checkbox') {
									(inputs[l].checked) ? optionValue = true : optionValue = false;
								} else if (inputs[l].getAttribute('type') == 'radio') {
									if (inputs[l].checked) {
										optionValue = inputs[l].value;
									}
								} else {
									// check if it's a keycode, in which case we need to parse it into an array...
									if ((inputs[l].getAttribute('class')) && (inputs[l].getAttribute('class').indexOf('keycode') >= 0)) {
										var tempArray = inputs[l].value.split(',');
										// convert the internal values of this array into their respective types (int, bool, bool, bool)
										optionValue = [parseInt(tempArray[0]), (tempArray[1] == 'true'), (tempArray[2] == 'true'), (tempArray[3] == 'true')];
									} else {
										optionValue = inputs[l].value;
									}
								}
								if ((optionValue != '') && (inputs[l].getAttribute('type') != 'radio')) {
									notAllBlank = true;
								}
								// optionRow[k] = optionValue;
							}
							if (optionValue || notAllBlank) {
								optionRow.push(optionValue);
							}
						}
						// just to be safe, added a check for optionRow != null...
						if ((notAllBlank) && (optionRow != null)) {
							optionMulti[optionRowCount] = optionRow;
							optionRowCount++;
						}
					}
					if (optionMulti == null) {
						optionMulti = [];
					}
					// ok, we've got all the rows... set the option.
					if (typeof(optionValue) != 'undefined') {
						RESUtils.setOption(moduleID, optionName, optionMulti);
					}
				}
			}
		}
		
		var statusEle = document.getElementById('moduleOptionsSaveStatus');
		if (statusEle) {
			statusEle.innerHTML = 'Options have been saved...';
			statusEle.setAttribute('style','display: block; opacity: 1');
		}
		RESUtils.fadeElementOut(statusEle, 0.1)
		/*
		var statusEleBottom = document.getElementById('moduleOptionsSaveStatusBottom');
		statusEleBottom.innerHTML = 'Options have been saved...';
		statusEleBottom.setAttribute('style','display: block; opacity: 1');
		RESUtils.fadeElementOut(statusEleBottom, 0.1)
		*/
		if (moduleID == 'RESPro') RESStorage.removeItem('RESmodules.RESPro.lastAuthFailed');
	}
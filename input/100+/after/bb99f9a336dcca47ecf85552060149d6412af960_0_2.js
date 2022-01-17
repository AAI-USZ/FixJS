function(moduleID, optionName, optionObject, isTable) {
		switch(optionObject.type) {
			case 'textarea':
				// textarea...
				var thisOptionFormEle = createElementWithID('textarea', optionName);
				thisOptionFormEle.setAttribute('type','textarea');
				thisOptionFormEle.setAttribute('moduleID',moduleID);
				thisOptionFormEle.innerHTML = optionObject.value;
				break;
			case 'text':
				// text...
				var thisOptionFormEle = createElementWithID('input', optionName);
				thisOptionFormEle.setAttribute('type','text');
				thisOptionFormEle.setAttribute('moduleID',moduleID);
				thisOptionFormEle.setAttribute('value',optionObject.value);
				break;
			case 'list':
				// list...
				var thisOptionFormEle = createElementWithID('input', optionName);
				thisOptionFormEle.setAttribute('class','RESInputList');
				thisOptionFormEle.setAttribute('type','text');
				thisOptionFormEle.setAttribute('moduleID',moduleID);
				// thisOptionFormEle.setAttribute('value',optionObject.value);
				existingOptions = optionObject.value;
				if (typeof(existingOptions) == 'undefined') existingOptions = '';
				var prepop = [];
				var optionArray = existingOptions.split(',');
				for (var i=0, len=optionArray.length; i<len; i++) {
					if (optionArray[i] != '') prepop.push({id: optionArray[i], name: optionArray[i]});
				}
				setTimeout(function() {
					$(thisOptionFormEle).tokenInput(optionObject.source, {
						method: "POST",
						queryParam: "query",
						theme: "facebook",
						allowCustomEntry: true,
						onResult: (typeof(optionObject.onResult) == 'function') ? optionObject.onResult : null,
						prePopulate: prepop,
						hintText: (typeof(optionObject.hintText) == 'string') ? optionObject.hintText : null
					});
				}, 100);
				break;
			case 'password':
				// password...
				var thisOptionFormEle = createElementWithID('input', optionName);
				thisOptionFormEle.setAttribute('type','password');
				thisOptionFormEle.setAttribute('moduleID',moduleID);
				thisOptionFormEle.setAttribute('value',optionObject.value);
				break;
			case 'boolean':
				// checkbox
				/*
				var thisOptionFormEle = createElementWithID('input', optionName);
				thisOptionFormEle.setAttribute('type','checkbox');
				thisOptionFormEle.setAttribute('moduleID',moduleID);
				thisOptionFormEle.setAttribute('value',optionObject.value);
				if (optionObject.value) {
					thisOptionFormEle.setAttribute('checked',true);
				}
				*/
				var thisOptionFormEle = RESUtils.toggleButton(optionName, optionObject.value, null, null, isTable);
				break;
			case 'enum':
				// radio buttons
				if (typeof(optionObject.values) == 'undefined') {
					alert('misconfigured enum option in module: ' + moduleID);
				} else {
					var thisOptionFormEle = createElementWithID('div', optionName);
					thisOptionFormEle.setAttribute('class','enum');
					for (var j=0;j<optionObject.values.length;j++) {
						var thisDisplay = optionObject.values[j].display;
						var thisValue = optionObject.values[j].value;
						var thisOptionFormSubEle = createElementWithID('input', optionName+'-'+j);
						if (isTable) thisOptionFormSubEle.setAttribute('tableOption','true');
						thisOptionFormSubEle.setAttribute('type','radio');
						thisOptionFormSubEle.setAttribute('name',optionName);
						thisOptionFormSubEle.setAttribute('moduleID',moduleID);
						thisOptionFormSubEle.setAttribute('value',optionObject.values[j].value);
						var nullEqualsEmpty = ((optionObject.value == null) && (optionObject.values[j].value == ''));
						// we also need to check for null == '' - which are technically equal.
						if ((optionObject.value == optionObject.values[j].value) || nullEqualsEmpty)  {
							thisOptionFormSubEle.setAttribute('checked','checked');
						}
						var thisOptionFormSubEleText = document.createTextNode(' ' + optionObject.values[j].name + ' ');
						thisOptionFormEle.appendChild(thisOptionFormSubEle);
						thisOptionFormEle.appendChild(thisOptionFormSubEleText);
						var thisBR = document.createElement('br');
						thisOptionFormEle.appendChild(thisBR);
					}
				}
				break;
			case 'keycode':
				// keycode - shows a key value, but stores a keycode and possibly shift/alt/ctrl combo.
				var thisOptionFormEle = createElementWithID('input', optionName);
				thisOptionFormEle.setAttribute('type','text');
				thisOptionFormEle.setAttribute('class','keycode');
				thisOptionFormEle.setAttribute('moduleID',moduleID);
				thisOptionFormEle.setAttribute('value',optionObject.value);
				break;
			default:
				console.log('misconfigured option in module: ' + moduleID);
				break;
		}
		if (isTable) {
			thisOptionFormEle.setAttribute('tableOption','true');
		}
		return thisOptionFormEle;
	}
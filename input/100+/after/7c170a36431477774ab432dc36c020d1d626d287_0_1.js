function(advancedSearch) {
				var options = {
					className: isDateField ? 'com.idega.presentation.ui.IWDatePicker' : 'com.idega.presentation.ui.TextInput',
					properties: [
									{id: 'setId', value: id},
									{id: 'setStyleClass', value: 'variableValueField'},
									{id: isDateField ? 'setInputName' : 'setName', value: dwr.util.getValue(chooserId)},
									{id: 'setOnKeyUp', value: 'if (isEnterEvent(event)) { CasesListHelper.addVariablesAndSearch(); } return false;'}
								],
					container: id2,
					callback: function() {
						closeAllLoadingMessages();
						dwr.util.setValue(chooserId, '-1');
						jQuery('#' + id2).append('<img class=\'variableFieldDeleter\' onclick="jQuery(\'#' + id2 +
							'\').hide(\'normal\', function() {jQuery(\'#' + id2 + '\').remove();});" src=\''+deleteImage+'\' />').show('fast');
					},
					append: true
				};
				
				var valueToSet = null;
				var beanName = 'bpmVariableValueResolver' + optionValue[0];
				CasesEngine.isResolverExist(beanName, {
					callback: function(resolverClass) {
						if (resolverClass != null && resolverClass != '') {
							var useProvidedClass = true;
							if (isMultipleObjectsField && advancedSearch && 'list_ticketViolationsNumbers' != optionValue[0]) {
								options.className = 'com.idega.presentation.ui.SelectionBox';
								useProvidedClass = false;
							} else {
								options.className = 'com.idega.presentation.ui.DropdownMenu';
							}
							if (useProvidedClass && resolverClass != options.className)
								options.className = resolverClass;

							valueToSet = '#{' + beanName + '.getValues(\'' + procDefId + '\', \'' + optionValue[0] + '\')}';
						}

						if (valueToSet != null)
							options.properties.push({id: 'setValue', value: valueToSet});

						IWCORE.getRenderedComponentByClassName(options);
					}
				});				
			}
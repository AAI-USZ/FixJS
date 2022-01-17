function initRecipeStepsRowContainer(type, contentParent){
		if (typeof(contentParent) === 'undefined') return;
		if (contentParent.find('.steps .addRowContainer').length == 0){
			return;
		}
		if (contentParent.find('.steps .addRowContainer .rowContainerInitialized').length > 0){
			return;
		}
		
		stepConfig = contentParent.find('#stepConfigValues').attr('value');
		if (stepConfig && stepConfig.length > 0){
			stepConfig = JSON.parse(stepConfig);
		} else {
			stepConfig = [];
			return;
		}
		
		ingredients = contentParent.find('#ingredientsJSON').attr('value');
		ingredients = JSON.parse(ingredients);
		
		var container = contentParent.find('.steps .addRowContainer');
		var data = contentParent.find('#rowsJSON').attr('value');
		var errors = contentParent.find('#errorJSON').attr('value');
		initRowContainer(container, data, errors, ':not([id$=STT_ID]):not([id$=ACT_ID])', function(newLine){
			var ingredientSelectContentElem = newLine.find('[id$=ING_ID]');
			ingredientSelectContent = ingredientSelectContentElem.parents(':first').html();
			//ingredientSelectContentElem.remove();
			ingredientSelectContentElem.parents(':first').html('');
			var weightContentElem = newLine.find('[id*=STE_GRAMS]');
			weightContent = weightContentElem.parents(':first').html();
			weightContentElem.remove();
			newLineContent = '<tr class="%class%">' + newLine.html() + '</tr>';
		}, function(newLine, data_row){
			var stepType = newLine.find('[id$=STT_ID]');
			setFieldValue(stepType,data_row.STT_ID);
			updateFields(stepType);
			
			var actionType = newLine.find('[id$=ACT_ID]');
			setFieldValue(actionType,data_row.ACT_ID);
			updateIngredientVisible(actionType);
		}, function(fieldParents, data_row){
			var ingredientField = fieldParents.find('[id$=ING_ID]');
			if (ingredientField.length > 0){
				var value = data_row['ING_ID'];
				ingredientField.attr('value',value);
				contentParent.find('#' + ingredientField.attr('id') + '_DESC').html(ingredients[value]);
			}
		});
		
		initMultiFancyCoose();
	}
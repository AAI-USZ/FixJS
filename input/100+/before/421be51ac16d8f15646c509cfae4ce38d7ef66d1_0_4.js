function () {
					var select, cell;
					select = $('<select id="' + inputId(index) + '" class="propertySelect" attr="' + 
						index + '"></select>');

					$.each(dropdownValues, function (i, value) {
						var option = $("<option>" + value + "</option>");
						if (value in dropdownDocumentation) {
							option.attr("title", dropdownDocumentation[value]);
						}
						select.append(option);
					});

					cell = $('<td class="input"></td>').append(select)
					if (!attribute.enabled && !schemaAttribute.hasOwnProperty("defaultValue")) {
						cell.attr('disabled', true);
					}
					
					return cell;
				}
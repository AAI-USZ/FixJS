function (choiceIndex, choice) {
				var addedToTab = false;
				schemaChoiceIndexes[choiceIndex] = [];

				$.each(choice.attributes, function (attributeName, attribute) {
					var editor;
					if (!addedToTab) {
						// exception for date-part node
						if (nodeData.name === "date-part") {
							choicePanel.addPanel(attribute.values[attribute.values.length - 1].value);
						} else {
							choicePanel.addPanel(attributeName);
						}
						addedToTab = true;
					}
					
					attrIndex++;
					editor = createAttributeEditor(attributeName, attribute, attrIndex);
					schemaChoiceIndexes[choiceIndex].push(attrIndex);

					editor.find('button.toggleAttrButton').remove();
					editor.find('*').removeAttr('disabled');
					choicePanel.contentPanels[choiceIndex].append(editor);
				});

				if (!addedToTab) {
					choicePanel.addPanel("No attributes for this option");
				}
			}
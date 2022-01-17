function (propertyPanelElement, node, elementString) {
		var dataType,
			schemaAttributes;

		if (suppressUpdates) {
			return;
		}

		// show appropriate property panel
		switch (node.name) {
			case "sort":
				CSLEDIT.sortPropertyPanel.setupPanel(propertyPanelElement, node, executeCommand);
				break;
			case "info":
				CSLEDIT.infoPropertyPanel.setupPanel(propertyPanelElement, executeCommand);
				break;
			case "if":
			case "else-if":
				new CSLEDIT.ConditionalPropertyPanel(propertyPanelElement, node, executeCommand);
				break;
			case "choose":
				propertyPanelElement.children().remove();
				propertyPanelElement.append(
					"<p>This node allows you to customise the formatting " +
					"depending on the properties of the reference being cited.</p>" +
					"<p>e.g. To show the volume number <em>only</em> " +
					"if the document type is article-journal:</p>" +
					'<ol>' +
					'<li>1. Use the "Add Node" button at the top left to add an "if" node</li>' +
					'<li>2. Edit the "if" node to say "The document type is article-journal"</li>' +
					'<li>3. Within the "if" node, add a "number" node and set its ' +
					'variale to "volume"</li>' +
					'</ol>'
					);
				break;
			default:
				dataType = CSLEDIT.schema.elementDataType(elementString);
				schemaAttributes = CSLEDIT.schema.attributes(elementString);

				CSLEDIT.genericPropertyPanel.setupPanel(
					propertyPanelElement, node, dataType, schemaAttributes,
					CSLEDIT.schema.choices(elementString), executeCommand);
		}
	}
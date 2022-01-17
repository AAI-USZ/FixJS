function createAttribute(attribute, parentXPath, parentId) {
			var container = $("#" + parentId + options.attributesContainerSelector);
			var attributeId = parentId + "_" + attribute.title;

			var attributeContainer = $("<div/>").attr({
				'id' : attributeId + "_cont",
				'class' : 'attribute_container'
			}).appendTo(container);

			$('<label/>').attr({
				'for' : attributeId
			}).text(attribute.title).appendTo(attributeContainer);

			$("<a/>").html("(x)").on('click', function() {
				removeAttribute(attribute, parentXPath);
				attributeContainer.remove();
				$("#" + attributeId + "_btn").removeClass("disabled");
			}).appendTo(attributeContainer);

			var child = xml.evaluate(parentXPath, xml, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

			if (child == null || child.singleNodeValue == null)
				return;

			var value = child.singleNodeValue.getAttribute(attribute.title);
			var attributeExists = !(value == null || value === undefined);
			
			if (value) {
			} else if (attribute.defaultValue) {
				value = attribute.defaultValue;
			} else {
				value = '';
			}
			
			// If the attribute did not exist in the document, add it in with a default.
			if (!attributeExists) {
				child.singleNodeValue.setAttribute(attribute.title, value);
			}

			var attributeInput = null;
			// set up attribute entry form based on type of attribute
			if (attribute.type == 'text') {
				attributeInput = $('<input/>').attr({
					'id' : attributeId,
					'type' : 'text',
					'value' : value
				}).appendTo(attributeContainer);
			} else if (attribute.type == 'selection') {
				var selectionValues = attribute.values;
				attributeInput = $('<select/>').attr({
					'id' : attributeId,
					'value' : value
				}).appendTo(attributeContainer);

				for ( var val in selectionValues) {
					$('<option/>', {
						value : selectionValues[val],
						text : selectionValues[val],
						selected : (value == selectionValues[val])
					}).appendTo(attributeInput);
				}
			}
			attributeInput.data('mods', {
				'parentId': parentId,
				'attribute': attribute,
				'parentXPath': parentXPath
			});

			// Bind change callback
			$('#' + attributeId).change(changeAttributeCallback);

			return attributeContainer;
		}
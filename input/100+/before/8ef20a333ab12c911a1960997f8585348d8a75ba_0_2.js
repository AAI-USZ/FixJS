function addTopActions(element, parentXPath, elementId, parentId, appendTarget, instanceNumber) {
			var topActionSpan = $("<li class='top_actions'/>").appendTo(appendTarget);

			// create move up button and callback for element
			$('<input>').attr({
				'type' : 'button',
				'value' : '\u2193',
				'id' : elementId + '_down'
			}).appendTo(topActionSpan);

			$('#' + elementId + '_down').on('click',
					moveDownElementButtonCallback(parentId, element, parentXPath, instanceNumber));

			// create move up button and callback for element
			$('<input>').attr({
				'type' : 'button',
				'value' : '\u2191',
				'id' : elementId + '_up'
			}).appendTo(topActionSpan);

			$('#' + elementId + '_up').on('click',
					moveUpElementButtonCallback(parentId, element, parentXPath, instanceNumber));

			// create delete button and callback for element
			$('<input>').attr({
				'type' : 'button',
				'value' : 'X',
				'id' : elementId + '_del'
			}).appendTo(topActionSpan);

			$('#' + elementId + '_del').on('click',
					deleteElementButtonCallback(parentId, element, parentXPath, instanceNumber));
		}
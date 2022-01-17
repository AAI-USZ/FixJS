function addTopActions(element, parentXPath, parentId, appendTarget, instanceNumber) {
			var topActionSpan = $("<li class='top_actions'/>").appendTo(appendTarget);

			// create move up button and callback for element
			$('<input>').attr({
				'type' : 'button',
				'value' : '\u2193',
				'id' : parentId + '_down'
			}).appendTo(topActionSpan);

			$('#' + parentId + '_down').on('click',
					moveDownElementButtonCallback(parentId, element, parentXPath, instanceNumber));

			// create move up button and callback for element
			$('<input>').attr({
				'type' : 'button',
				'value' : '\u2191',
				'id' : parentId + '_up'
			}).appendTo(topActionSpan);

			$('#' + parentId + '_up').on('click',
					moveUpElementButtonCallback(parentId, element, parentXPath, instanceNumber));

			// create delete button and callback for element
			$('<input>').attr({
				'type' : 'button',
				'value' : 'X',
				'id' : parentId + '_del'
			}).appendTo(topActionSpan);

			$('#' + parentId + '_del').on('click',
					deleteElementButtonCallback(parentId, element, parentXPath, instanceNumber));
		}
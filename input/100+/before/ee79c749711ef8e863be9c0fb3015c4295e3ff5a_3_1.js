function(viewModel, viewTemplate) {

		function createView(viewText, parentElement, containerType) {
			//set defaults
			containerType = typeof containerType !== 'undefined' ? type : '<span/>';
			parentElement = typeof parentElement !== 'undefined' ? parent : $('body');

			//create a random id for the child
			var childId = _.uniqueId([ 'container_' ]);
			//create the child container
			parentElement.append($(containerType, { id: childId }));
			//add template text to the child container as html
			$('#' + childId).html(viewText);
			
			return childId;
		};
		
		var viewId = createView(viewTemplate);
        ko.applyBindings(viewModel, document.getElementById(viewId));
        
		return {
			dispose: function() {
				$('#' + viewId).remove();
			},
		};

	}
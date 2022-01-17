function(node){

		var allStateContainers = [];

		var n = node;

		while(n){

			if(n._maqAppStates){

				allStateContainers.splice(0, 0, n);

			}

			if(n.tagName == 'BODY'){

				break;

			}

			n = n.parentNode;

		}

		return allStateContainers;

	}
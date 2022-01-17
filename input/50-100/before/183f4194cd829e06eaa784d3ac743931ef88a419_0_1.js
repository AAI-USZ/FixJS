function findStateContainers(currentNode){

			if(currentNode._maqAppStates){

				allStateContainers.push(currentNode);

			}

			for(var i=0; i<currentNode.children.length; i++){

				findStateContainers(currentNode.children[i]);

			}

		}
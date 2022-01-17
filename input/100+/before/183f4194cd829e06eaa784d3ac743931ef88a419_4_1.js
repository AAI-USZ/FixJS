function(){

		var context;

		if(Runtime.currentEditor && Runtime.currentEditor.currentEditor && Runtime.currentEditor.currentEditor.context){

			context = Runtime.currentEditor.currentEditor.context;

		}else{

			return;

		}

		var statesFocus = States.getFocus(context.rootNode);

		if(!statesFocus || !statesFocus.state || statesFocus.state === States.NORMAL){

			return;

		}

		var node = statesFocus.stateContainerNode;

		var state = state = davinci.ve.states.getState(node);

		davinci.ve.states.remove(node, state);

	}
function() {

		

		var states = this._editor._theme.getStatesForAllWidgets();

		var names = {"Normal": "Normal"};

		if (states) {

			for (var i=0; i<states.length;i++){

				var name = states[i];

				if (name != "Normal") {

						names[name] = name;

				}

			}

		}

		latestStates = names;

		var storedScenes = this._getScenes();



		// Build an object structure that contains the latest list of states/scenes/views

		// We will then build a similar object structure by extracting the list from the ItemFileWriteStore

		// and then compare the two to see if there are any changes

		var fileName;

		if(this._editor && this._editor.getFileNameToDisplay){

			fileName = this._editor.getFileNameToDisplay();

		}else{

			fileName = (this._editor && this._editor.fileName) ? this._editor.fileName : 'file';

		}

		var BodyNode = {name:fileName, type:'file', category:'file', children:[]};

		var AppStatesObj = {name:'Widget States', type:'SceneManagerRoot', category:'AppStates', children:[]};

		var latestData = [BodyNode];

		for(var state in latestStates){

			AppStatesObj.children.push({ name:state, sceneId:state, type:'AppState' });

		}

		//Commented out line below is what we would do if we decided that sometimes

		//we needed to show an extra nesting level in the Tree which showed

		//the SceneManager containers.

		//	BodyNode.children.push(AppStatesObj);

		BodyNode.children = BodyNode.children.concat(AppStatesObj.children);



		// If data in Tree widget is same as latest data, then just return

		if(!this._compareStructures(latestData, storedScenes)){

			// Destroy the old Tree widget and create a new Tree widget

			this._destroyTree();

			this._createTree(latestData);

		}

	}
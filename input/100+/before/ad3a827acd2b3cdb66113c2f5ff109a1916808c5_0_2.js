f
		if(!this._editor || !this._tree){

			return;

		}

		var context = this._editor.getContext();

		if(!context || !context._statesLoaded){

			return;

		}

		

		// Have to wrap in a deferred because dijit.Tree sometimes initially itself

		// asynchronously, and appears to do so always in the way we are using

		// Tree in this routine.

		this._tree.onLoadDeferred.then(function(){

		



/*FIXME: DELETE THIS

		var appStateFocus = States.getFocus(context.rootNode);

		if(appStateFocus && !appStateFocus.state){

			appStateFocus.state = States.NORMAL;

		}

*/

			// In logic below, we will be looking to see which tree node is selected

			// and whether it matches one of the "scenes" (e.g., a Dojo Mobile View)

			// or matches the currently focused application state.

			// If so, then leave selection as is. Otherwise, update selection

			// as follows:

			//  * if there are any "scenes" (e.g., Dojo Mobile View), set tree selection

			//    to match top-level selected scene

			//  * otherwise, select application state that has "focus"

			var path = this._tree.get('path');

			var selectedId = (path.length > 0) ? path[path.length-1].id[0] : null;

			var selectedNodeIsCorrectType = false;

			var candidateItem = null;

			

			// Search through SceneManagers to find all scene containers for each scene manager

			// and then all scenes for each scene container.

			// Then update the icons for each scene to reflect whether currently selected (isCurrent)

			// and whether that scene should appear when document is opened (isInitial).

			// Also see if currently selected Tree node corresponds to one of the scenes.

			var sceneManagers = context.sceneManagers;

			for(var smIndex in sceneManagers){

				var sm = sceneManagers[smIndex];

				if(sm.getAllSceneContainers && sm.getSceneChildren && sm.getCurrentScene){

					var allSceneContainers = sm.getAllSceneContainers();

					var allSceneItems;

					this._sceneStore.fetch({query: {type:sm.category}, queryOptions:{deep:true}, 

						onComplete: dojo.hitch(this, function(items, request){

							allSceneItems = items;

						})

					});

					for(var k=0; k<allSceneItems.length; k++){

						var sceneItem = allSceneItems[k];

						var sceneContainerNode = sceneItem.sceneContainerNode[0];

						var id = sceneItem.id[0];

	/*FIXME: DELETE THIS

						var currentScene = sm.getCurrentScene(sceneContainerNode);

						var initialScenes = sm.getInitialScenes(sceneContainerNode);

	*/

						var currentSpan = this._findTreeNodeSpanByClass(sceneItem, 'ScenesPaletteCurrent');

						var focusSpan = this._findTreeNodeSpanByClass(sceneItem, 'ScenesPaletteFocus');

						var initialSpan = this._findTreeNodeSpanByClass(sceneItem, 'ScenesPaletteInitial');

	/*FIXME: DELETE THIS

						if(currentScene == sceneItem.node[0]){

	*/

						if(sceneItem.isCurrent && sceneItem.isCurrent[0]){

							if(currentSpan){

								domClass.remove(currentSpan, 'ScenesPaletteCurrentHidden');

							}

							if(id === selectedId){

								selectedNodeIsCorrectType = true;

							}else if(!candidateItem){

								candidateItem = sceneItem;

							}

						}else{

							if(currentSpan){

								domClass.add(currentSpan, 'ScenesPaletteCurrentHidden');

							}

						}

						if(focusSpan){

							domClass.add(focusSpan, 'ScenesPaletteFocusHidden');

						}

	/*FIXME: DELETE THIS

						if(initialScenes.indexOf(sceneItem.node[0])>=0){

	*/

						if(sceneItem.isInitial && sceneItem.isInitial[0]){

							if(initialSpan){

								domClass.remove(initialSpan, 'ScenesPaletteInitialHidden');

							}

						}else{

							if(initialSpan){

								domClass.add(initialSpan, 'ScenesPaletteInitialHidden');

							}

						}

					}

				}

			}

			

			// Find all "state containers" (i.e., container nodes that can define a list of application states)

			// and then find all application states defined by each state container.

			// Then update the icons for each state to reflect whether currently selected (isCurrent),

			// whether it is the "focus" (i.e., target) for subsequent styling operations,

			// and whether that state should appear when document is opened (isInitial).

			var allAppStateItems = [];

			this._sceneStore.fetch({query: {type:'AppState'}, queryOptions:{deep:true}, 

				onComplete: dojo.hitch(this, function(items, request){

					allAppStateItems = items;

				})

			});

			for(var k=0; k<allAppStateItems.length; k++){

				var appStateItem = allAppStateItems[k];

				var sceneContainerNode = appStateItem.sceneContainerNode[0];

				var id = appStateItem.id[0];

	/*FIXME: DELETE THIS

				var currentState = States.getState(sceneContainerNode);

				if(!currentState){

					currentState = States.NORMAL;

				}

				var initialState = States.getInitial(sceneContainerNode);

				if(!initialState){

					initialState = States.NORMAL;

				}

	*/

				var currentSpan = this._findTreeNodeSpanByClass(appStateItem, 'ScenesPaletteCurrent');

				var focusSpan = this._findTreeNodeSpanByClass(appStateItem, 'ScenesPaletteFocus');

				var initialSpan = this._findTreeNodeSpanByClass(appStateItem, 'ScenesPaletteInitial');

	/*FIXME: DELETE THIS

				if(currentState === appStateItem.sceneId[0]){

	*/

				if(appStateItem.isCurrent && appStateItem.isCurrent[0]){

	/*FIXME: DELETE THIS

					if(appStateFocus && appStateFocus.stateContainerNode == sceneContainerNode && appStateFocus.state == currentState){

	*/

					if(appStateItem.isFocus && appStateItem.isFocus[0]){

						if(focusSpan){

							domClass.remove(focusSpan, 'ScenesPaletteFocusHidden');

						}

						if(currentSpan){

							domClass.remove(currentSpan, 'ScenesPaletteCurrentHidden');

						}

						if(id === selectedId){

							selectedNodeIsCorrectType = true;

						}else if(!candidateItem){

							candidateItem = appStateItem;

						}

					}else{

						if(focusSpan){

							domClass.add(focusSpan, 'ScenesPaletteFocusHidden');

						}

						if(currentSpan){

							domClass.remove(currentSpan, 'ScenesPaletteCurrentHidden');

						}

					}

				}else{

					if(focusSpan){

						domClass.add(focusSpan, 'ScenesPaletteFocusHidden');

					}

					if(currentSpan){

						domClass.add(currentSpan, 'ScenesPaletteCurrentHidden');

					}

				}

	/*FIXME: DELETE THIS

				if(initialState === appStateItem.sceneId[0]){

	*/

				if(appStateItem.isInitial && appStateItem.isInitial[0]){

					if(initialSpan){

						domClass.remove(initialSpan, 'ScenesPaletteInitialHidden');

					}

				}else{

					if(initialSpan){

						domClass.add(initialSpan, 'ScenesPaletteInitialHidden');

					}

				}

			}

			// Update selected node in the Tree if the current selected node

			// isn't set to either a "scene" (e.g., Dojo Mobile View) or

			// the currently focused application state.

			if(!selectedNodeIsCorrectType && candidateItem){

				var newPath = this._getTreeSelectionPath(candidateItem);

				if(newPath.length > 0){

					this._tree.set('path', newPath);

				}

			}

		}.bind(this));

	},

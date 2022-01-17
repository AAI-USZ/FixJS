function() {

		var storedScenes = this._getScenes();

		if(!this._editor || !storedScenes){

			return;

		}

		var context = this._editor.getContext();

		if(!context || !context._statesLoaded){

			return;

		}

		

		// Build an object structure that contains the latest list of states/scenes/views

		// We will then build a similar object structure by extracting the list from the ItemFileWriteStore

		// and then compare the two to see if there are any changes

		var sceneManagers = context.sceneManagers;

		var existingItems = [];	// Used inside recurseWidget to look up into existing list of items

		var that = this;

		function recurseWidget(widget, currentParentItem){

			var node = widget.domNode;

			var isStateContainer = States.isStateContainer(node);

			var isSceneContainer = false;

			for(var smIndex in sceneManagers){

				var sm = sceneManagers[smIndex];

				if(sm.getSceneChildren && sm.name && sm.category){

					isSceneContainer = sm.isSceneContainer(node);

					if(isSceneContainer){

						break;

					}

				}

			}

			if(node.tagName == 'BODY' || isStateContainer || isSceneContainer){

				// If the current parent node (i.e., node) matches one of the nodes already

				// in the tree, then use its corresponding tree data item as

				// the currentParentNode. This prevents adding an extra entry in the

				// tree for the same node.

				var currentParentItemAlreadyThere = null;

				for(var e=0; e<existingItems.length; e++){

					var existingItem = existingItems[e];

					if(existingItem.node == node){

						currentParentItemAlreadyThere = existingItem;

						break;

					}

				}

				// Otherwise, if current node is not already in tree, see if

				// any of the current node's ancestors are in the tree

				var ancestorParentItem = null;

				if(!currentParentItemAlreadyThere){

					pn = node.parentNode;

					ancestorParentItemLoop:

					while(pn){

						for(var e=0; e<existingItems.length; e++){

							var existingItem = existingItems[e];

							if(existingItem.node == pn){

								ancestorParentItem = existingItem;

								break ancestorParentItemLoop;

							}

						}

						if(pn.tagName == 'BODY'){

							break;

						}

						pn = pn.parentNode;

					}

				}

				if(currentParentItemAlreadyThere){

					currentParentItem = currentParentItemAlreadyThere;

				}else{

					var label = WidgetUtils.getLabel(widget);

					var o = {name:label, type:'file', category:'file', node:node, children:[]};

					if(ancestorParentItem){

						// Make sure that any new nodes are nested within the node corresponding

						// to their nearest ancestor node

						ancestorParentItem.children.push(o);

					}else{

						// This should only happen for BODY

						currentParentItem.children.push(o);

					}

					existingItems.push(o);

					currentParentItem = o;

				}

				if(isStateContainer){

					var appstates = States.getStates(node);

					var currentState = States.getState(node);

					if(!currentState){

						currentState = States.NORMAL;

					}

					var initialState = States.getInitial(node);

					if(!initialState){

						initialState = States.NORMAL;

					}

					var AppStatesObj = {name:'Application States', type:'SceneManagerRoot', category:'AppStates', 

							parentItem:currentParentItem, children:[]};

					for(var st=0; st<appstates.length; st++){

						var state = appstates[st];

						var span = that._treeNodeContent(state);

						var isFocus = (appStateFocus && appStateFocus.stateContainerNode == node && appStateFocus.state == currentState);

						var isCurrent = (state === currentState);

						var isInitial = (state === initialState);

						var o = { name:span, sceneId:state, type:'AppState', 

								isFocus:isFocus, isCurrent:isCurrent, isInitial:isInitial,

								sceneContainerNode:node, parentItem:AppStatesObj };

						AppStatesObj.children.push(o);

						existingItems.push(o);

					}

					currentParentItem.children.push(AppStatesObj);

					existingItems.push(AppStatesObj);

				}

				if(isSceneContainer){

					for(var smIndex in sceneManagers){

						var sm = sceneManagers[smIndex];

						if(sm.getSceneChildren && sm.getCurrentScene && sm.getInitialScenes && sm.name && sm.category){

							var sceneChildren = sm.getSceneChildren(node);

							if(sceneChildren.length > 0){

								var currentScene = sm.getCurrentScene(node);

								var initialScenes = sm.getInitialScenes(node);

								var SceneManagerObj = { name:sm.name, type:'SceneManagerRoot', category:sm.category, 

										parentItem:currentParentItem, children:[]};

								for(var childSceneIndex=0; childSceneIndex<sceneChildren.length; childSceneIndex++){

									var childSceneNode = sceneChildren[childSceneIndex];

									var label = WidgetUtils.getLabel(childSceneNode._dvWidget);

									var span = that._treeNodeContent(label);

									var isFocus = false;	// No concept if scene focus for plug-in scene managers

									var isCurrent = (childSceneNode === currentScene);

									var isInitial = (initialScenes.indexOf(childSceneNode)>=0);

									var o = { name:span, sceneId:childSceneNode.id, type:sm.category, 

											isFocus:isFocus, isCurrent:isCurrent, isInitial:isInitial,

											sceneContainerNode:node, parentItem:SceneManagerObj, node:childSceneNode, children:[] };

									SceneManagerObj.children.push(o);

									existingItems.push(o);

								}

								currentParentItem.children.push(SceneManagerObj);

								existingItems.push(o);

							}

						}

					}

				}

			}

			var children = widget.getChildren();

			for(var j=0; j<children.length; j++){

				recurseWidget(children[j], currentParentItem);

			}

		}

		var appStateFocus = States.getFocus(context.rootNode);

		if(appStateFocus && !appStateFocus.state){

			appStateFocus.state = States.NORMAL;

		}

		// Temporary root object onto which we will attach a BODY item

		// All other items in the structure will descend from the BODY item

		var temporaryRootObj = {children:[]};

		recurseWidget(context.rootWidget, temporaryRootObj);

		var latestData = [temporaryRootObj.children[0]];



		// If data in Tree widget is same as latest data, then just return

		if(!this._compareStructures(latestData, storedScenes)){

			// Store away info about currently selected tree item

			var oldSelection = null;

			if(this._tree && this._sceneStore){

				var selectedItem = null;

				var path = this._tree.get('path');

				if(path.length > 0){

					var selectedId = path[path.length-1].id[0];

					this._sceneStore.fetch({query: {id:selectedId}, queryOptions:{deep:true}, 

						onComplete: dojo.hitch(this, function(items, request){

							if(items.length > 0){

								selectedItem = items[0];

								if(selectedItem.sceneId && selectedItem.sceneContainerNode){

									oldSelection = { sceneId:selectedItem.sceneId[0], sceneContainerNode:selectedItem.sceneContainerNode[0] };

								}

							}

						})

					});

				}

			}

			

			// Destroy the old Tree widget and create a new Tree widget

			this._destroyTree();

			this._createTree(latestData);

			

			// Restore the selection

			if(oldSelection){

				// Have to wrap in a deferred because dijit.Tree sometimes initially itself

				// asynchronously, and appears to do so always in the way we are using

				// Tree in this routine.

				this._tree.onLoadDeferred.then(function(){

					this._sceneStore.fetch({query: {sceneId:oldSelection.sceneId}, queryOptions:{deep:true}, 

						onComplete: dojo.hitch(this, function(items, request){

							for(var i=0; i<items.length; i++){

								var item = items[i];

								if(item.sceneId[0] == oldSelection.sceneId && item.sceneContainerNode[0] == oldSelection.sceneContainerNode){

									var path = this._getTreeSelectionPath(item);

									if(path.length > 0){

										this._tree.set('path', path);

									}

								}

							}

						})

					});

				}.bind(this));

			}

		}

		

		this._hideShowToolBar();



	}
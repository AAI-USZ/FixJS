function recurseWidget(widgetOrNode, currentParentItem){

			// Page editor passes in a widget, review editor passes in a DOM node

			var widget, domNode;

			var isDvWidget = (widgetOrNode.declaredClass && widgetOrNode.isInstanceOf && widgetOrNode.isInstanceOf(Widget));

			if(isDvWidget){

				widget = widgetOrNode;

				node = widget.domNode;

			}else{

				widget = null;

				node = widgetOrNode;

			}

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

					//FIXME: We currently have bad labels for review/commenting

					var label = isDvWidget ? WidgetUtils.getLabel(widget) : node.tagName;

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

									//FIXME: We currently have bad labels for review/commenting

									var label = isDvWidget ? WidgetUtils.getLabel(childSceneNode._dvWidget) : childSceneNode.tagName;

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

			var children;

			if(isDvWidget){

				children = widget.getChildren();

				for(var j=0; j<children.length; j++){

					recurseWidget(children[j], currentParentItem);

				}

			}else{

				children = States._getChildrenOfNode(node);

				for(var j=0; j<children.length; j++){

					recurseWidget(children[j], currentParentItem);

				}

			}

		}
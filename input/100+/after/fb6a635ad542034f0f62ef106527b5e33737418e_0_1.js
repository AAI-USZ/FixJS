function(/*Event*/event){
			// summary:
			//		Enable keyboard accessibility into the GridContainer.
			// description:
			//		Possibility to move focus into the GridContainer (TAB, LEFT ARROW, RIGHT ARROW, UP ARROW, DOWN ARROW).
			//		Possibility to move GridContainer's children (Drag and Drop) with keyboard. (SHIFT +  ARROW).
			//		If the type of widget is not draggable, a popup is displayed.

			//console.log("dojox.layout.GridContainerLite ::: _selectFocus");
			if(this._disabled){ return; }
			var key = event.keyCode,
				k = keys,
				zone = null,
				cFocus = baseFocus.getFocus(),
				focusNode = cFocus.node,
				m = this._dragManager,
				found,
				i,
				j,
				r,
				children,
				area,
				widget;
			if(focusNode == this.containerNode){
				area = this.gridNode.childNodes;
				switch(key){
					case k.DOWN_ARROW:
					case k.RIGHT_ARROW:
						found = false;
						for(i = 0; i < area.length; i++){
							children = area[i].childNodes;
							for(j = 0; j < children.length; j++){
								zone = children[j];
								if(zone != null && zone.style.display != "none"){
									focus.focus(zone);
									events.stop(event);
									found = true;
									break;
								}
							}
							if(found){ break };
						}
					break;
					case k.UP_ARROW:
					case k.LEFT_ARROW:
						area = this.gridNode.childNodes;
						found = false;
						for(i = area.length-1; i >= 0 ; i--){
							children = area[i].childNodes;
							for(j = children.length; j >= 0; j--){
								zone = children[j];
								if(zone != null && zone.style.display != "none"){
									focus.focus(zone);
									events.stop(event);
									found = true;
									break;
								}
							}
							if(found){ break };
						}
					break;
				}
			}
			else{
				if(focusNode.parentNode.parentNode == this.gridNode){
					var child = (key == k.UP_ARROW || key == k.LEFT_ARROW) ? "lastChild" : "firstChild";
					var pos = (key == k.UP_ARROW || key == k.LEFT_ARROW) ? "previousSibling" : "nextSibling";
					switch(key){
						case k.UP_ARROW:
						case k.DOWN_ARROW:
							events.stop(event);
							found = false;
							var focusTemp = focusNode;
							while(!found){
								children = focusTemp.parentNode.childNodes;
								var num = 0;
								for(i = 0; i < children.length; i++){
									if(children[i].style.display != "none"){ num++ };
									if(num > 1){ break; }
								}
								if(num == 1){ return; }
								if(focusTemp[pos] == null){
									zone = focusTemp.parentNode[child];
								}
								else{
									zone = focusTemp[pos];
								}
								if(zone.style.display === "none"){
									focusTemp = zone;
								}
								else{
									found = true;
								}
							}
							if(event.shiftKey){
								var parent = focusNode.parentNode;
								for(i = 0; i < this.gridNode.childNodes.length; i++){
									if(parent == this.gridNode.childNodes[i]){
										break;
									}
								}
								children = this.gridNode.childNodes[i].childNodes;
								for(j = 0; j < children.length; j++){
									if(zone == children[j]){
										break;
									}
								}
								if(has("mozilla") || has("webkit")){ i-- };

								widget = registry.byNode(focusNode);
								if(!widget.dragRestriction){
									r = m.removeDragItem(parent, focusNode);
									this.addChild(widget, i, j);
									domAttr.set(focusNode, "tabIndex", "0");
									focus.focus(focusNode);
								}
								else{
									topic.publish("/dojox/layout/gridContainer/moveRestriction", this);
								}
							}
							else{
								focus.focus(zone);
							}
						break;
						case k.RIGHT_ARROW:
						case k.LEFT_ARROW:
							events.stop(event);
							if(event.shiftKey){
								var z = 0;
								if(focusNode.parentNode[pos] == null){
									if(has("ie") && key == k.LEFT_ARROW){
										z = this.gridNode.childNodes.length-1;
									}
								}
								else if(focusNode.parentNode[pos].nodeType == 3){
									z = this.gridNode.childNodes.length - 2;
								}
								else{
									for(i = 0; i < this.gridNode.childNodes.length; i++){
										if(focusNode.parentNode[pos] == this.gridNode.childNodes[i]){
											break;
										}
										z++;
									}
									if(has("mozilla") || has("webkit")){ z-- };
								}
								widget = registry.byNode(focusNode);
								var _dndType = focusNode.getAttribute("dndtype");
								if(_dndType == null){
									//check if it's a dijit object
									if(widget && widget.dndType){
										_dndType = widget.dndType.split(/\s*,\s*/);
									}
									else{
										_dndType = ["text"];
									}
								}
								else{
									_dndType = _dndType.split(/\s*,\s*/);
								}
								var accept = false;
								for(i = 0; i < this.acceptTypes.length; i++){
									for(j = 0; j < _dndType.length; j++){
										if(_dndType[j] == this.acceptTypes[i]){
											accept = true;
											break;
										}
									}
								}
								if(accept && !widget.dragRestriction){
									var parentSource = focusNode.parentNode,
										place = 0;
									if(k.LEFT_ARROW == key){
										var t = z;
										if(has("mozilla") || has("webkit")){ t = z + 1 };
										place = this.gridNode.childNodes[t].childNodes.length;
									}
									// delete of manager :
									r = m.removeDragItem(parentSource, focusNode);
									this.addChild(widget, z, place);
									domAttr.set(r, "tabIndex", "0");
									focus.focus(r);
								}
								else{
									topic.publish("/dojox/layout/gridContainer/moveRestriction", this);
								}
							}
							else{
								var node = focusNode.parentNode;
								while(zone === null){
									if(node[pos] !== null && node[pos].nodeType !== 3){
										node = node[pos];
									}
									else{
										if(pos === "previousSibling"){
											node = node.parentNode.childNodes[node.parentNode.childNodes.length-1];
										}
										else{
											node = node.parentNode.childNodes[has("ie") ? 0 : 1];
										}
									}
									zone = node[child];
									if(zone && zone.style.display == "none"){
										// check that all elements are not hidden
										children = zone.parentNode.childNodes;
										var childToSelect = null;
										if(pos == "previousSibling"){
											for(i = children.length-1; i >= 0; i--){
												if(children[i].style.display != "none"){
													childToSelect = children[i];
													break;
												}
											}
										}
										else{
											for(i = 0; i < children.length; i++){
												if(children[i].style.display != "none"){
													childToSelect = children[i];
													break;
												}
											}
										}
										if(!childToSelect){
											focusNode = zone;
											node = focusNode.parentNode;
											zone = null;
										}
										else{
											zone = childToSelect;
										}
									}
								}
								focus.focus(zone);
							}
						break;
					}
				}
			}
		}
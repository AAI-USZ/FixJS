function(item){
				var rn = (this.rootNode = this.tree._createTreeNode({
					item: item,
					tree: this,
					isExpandable: true,
					label: this.label || this.getLabel(item),
					textDir: this.textDir,
					indent: this.showRoot ? 0 : -1
				}));
				if(!this.showRoot){
					rn.rowNode.style.display="none";
					// if root is not visible, move tree role to the invisible
					// root node's containerNode, see #12135
					this.domNode.setAttribute("role", "presentation");
					this.domNode.removeAttribute("aria-expanded");
					this.domNode.removeAttribute("aria-multiselectable");
					
					rn.labelNode.setAttribute("role", "presentation");
					rn.containerNode.setAttribute("role", "tree");
					rn.containerNode.setAttribute("aria-expanded","true");
				}
				this.domNode.appendChild(rn.domNode);
				var identity = this.model.getIdentity(item);
				if(this._itemNodesMap[identity]){
					this._itemNodesMap[identity].push(rn);
				}else{
					this._itemNodesMap[identity] = [rn];
				}

				rn._updateLayout();		// sets "dijitTreeIsRoot" CSS classname

				// Load top level children (and if persist=true all nodes
				// that were previously opened)
				this._expandNode(rn).then(lang.hitch(this, function(){
					// Then, select the nodes that were selected last time, or
					// the ones specified by params.paths[].

					// Figure out which nodes to select:
					// the nodes specified by paths[] argument to constructor, or
					// those saved in cookie if persists=true
					var paths = this._initialPaths ||
						(this.persist && this.dndController._getSavedPaths()) || [];

					// Set flag to tell this.set("paths", ...) to start functioning
					this._loadCalled = true;

					// Do the selection and then fire onLoad()
					when(this.set("paths", paths), lang.hitch(this, function(){
						this.onLoadDeferred.resolve(true);
						this.onLoad();
					}));
				}));
			}
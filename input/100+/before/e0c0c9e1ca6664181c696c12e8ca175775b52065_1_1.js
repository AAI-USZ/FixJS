function(){
			this.inherited(arguments);
			
			
		
			
			this.arrowNode = this.fileDialogDetailsArrow;
			
			this._tree_collapse_expand();
			var t = this;
			if(this.dialogSpecificClass){
				require([this.dialogSpecificClass],function(c){
					t.dialogSpecificWidget = new c({dialogSpecificButtonsSpan:t.dialogSpecificButtonsSpan}, t.dialogSpecificOptionsDiv);
				});
			
				
			}
			this._whereMenu = new Menu({style: "display: none;"});
			this._whereDropDownButton = new DropDownButton({
				className: "whereDropDown",
	            dropDown: this._whereMenu,
				iconClass: "fileDialogWhereIcon"
	        });
			this.fileDialogWhereDropDownCell.appendChild(this._whereDropDownButton.domNode);
			if(!this.value){
				this._setValueAttr(this._getForcedRootAttr());
			}
			
			this.connect(this.arrowNode, 'onclick', dojo.hitch(this,function(e){
				this._tree_collapse_expand(!this.treeCollapsed);
			}));
			dojo.connect(this.fileDialogFileName, "onkeyup", this, '_checkValid');
			this.fileTree.watch("selectedItem", dojo.hitch(this, this._updateFields));
			var connectHandle = dojo.connect(this._fileDialog, "onkeypress", this, function(e){
				if(e.charOrCode===dojo.keys.ENTER){
					// XXX HACK This is to circumvent the problem where the Enter key
					//   isn't handled.  Normally, the Dijit Dialog handles that for
					//   us, but our dialog classes are messed up right now.  Hence
					//   this.
					var evt = document.createEvent("MouseEvents");
					evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false,
							false, 0, null);
					this.__okButton._onClick(evt);
				}
			
			});
			/* set initial value */
			
			this.fileTree.watch("selectedItem", dojo.hitch(this, this._checkValid));

		}
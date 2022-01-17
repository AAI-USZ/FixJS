function(){
			//console.log("dojox.layout.GridContainerLite ::: postCreate");
			this.inherited(arguments);
			this._grid = [];

			this._createCells();

			// need to resize dragged child when it's dropped.
			this.subscribe("/dojox/mdnd/drop", "resizeChildAfterDrop");
			this.subscribe("/dojox/mdnd/drag/start", "resizeChildAfterDragStart");

			this._dragManager = dojox.mdnd.areaManager();
			// console.info("autorefresh ::: ", this.autoRefresh);
			this._dragManager.autoRefresh = this.autoRefresh;

			//	Add specific dragHandleClass to the manager.
			this._dragManager.dragHandleClass = this.dragHandleClass;

			if(this.doLayout){
				this._border = {
					h: has("ie") ? geom.getBorderExtents(this.gridContainerTable).h : 0,
					w: (has("ie") == 6) ? 1 : 0
				}
			}
			else{
				domStyle.set(this.domNode, "overflowY", "hidden");
				domStyle.set(this.gridContainerTable, "height", "auto");
			}
			// Call postCreate of dijit.layout._LayoutWidget.
			this.inherited(arguments);
		}
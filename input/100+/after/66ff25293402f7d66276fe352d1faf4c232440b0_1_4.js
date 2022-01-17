function(event){
			// summary:
			//		Response to dojox/app "select" event.
			//
			// example:
			//		Use dojo/on.emit to trigger "select" event, and this function will response the event. For example:
			//		|	on.emit(this.app.evented, "select", view);
			//
			// event: Object
			//		{"parent":parent, "view":view}

			var parent = event.parent || this.app;
			var view = event.view;

			if(!view){
				return;
			}

			if(view !== parent.selectedChild){
				if(parent.selectedChild){
					domStyle.set(parent.selectedChild.domNode, "zIndex", 25);
				}

				domStyle.set(view.domNode, "display", "");
				domStyle.set(view.domNode, "zIndex", 50);
				parent.selectedChild = view;
			}
			// do selected view layout
			this._doResize(parent);
		}
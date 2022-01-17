function(){
			// Properties
            this.dndOps = {};           // Track each node's drag and drop movement.
            this.superRootId = -1;      // This is the imaginary root of the entire tree.
			window.foo = this;          // For debugging
			this._getData();            // Fetch the initial data.json
			this._buildButtons();       // Build UI buttons
			
			// Build dojo Tree components
			this.store 		= (this.store) ? this.store : new Store({data:this.data});
			this.model 		= new Model({store:this.store, query:{id:"root"}});
			this.tree 		= this._buildTree();
			
			// Connect collab & local events
			this.collab = coweb.initCollab({id:'foobar'});
			this.collab.subscribeSync('change.*', this, 'onRemoteChange');
			this.collab.subscribeStateRequest(this, 'onStateRequest');
			this.collab.subscribeStateResponse(this, 'onStateResponse');
			this._connectEvents();
			
			// Kick off session
			var sess = coweb.initSession();
		    sess.prepare();
		}
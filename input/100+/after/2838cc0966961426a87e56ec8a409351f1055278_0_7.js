function(token){
            /* Need to make domTree non-circular in order to send it. Just remove all parent
               references and other clients can re construct that information later. */
            var map = this.domTree_map;
            this.domTree.levelOrder(function(at) {
                if (at.parent)
                    at.parent = at.parent.id;
            });
	        var state = {
	            snapshot: this.newSnapshot,
                domTree : this.domTree,
	            attendees: this._attendeeList.attendees,
				title: this.title
	        };
	        this.collab.sendStateResponse(state,token);
            this.domTree.levelOrder(function(at) {
                at.parent = map[at.parent];
            });
	    }
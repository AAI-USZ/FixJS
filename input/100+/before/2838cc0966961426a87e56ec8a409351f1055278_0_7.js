function(token){
	        var state = {
	            snapshot: this.newSnapshot,
                domTree : this.domTree,
	            attendees: this._attendeeList.attendees,
				title: this.title
	        };
	        this.collab.sendStateResponse(state,token);
	    }
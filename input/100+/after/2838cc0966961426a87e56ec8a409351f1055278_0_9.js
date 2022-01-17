function(obj){
			this._textarea.innerHTML = '';
            this.domTree = this.reconstructTree(obj.domTree);
	        this._textarea.innerHTML = this.toHTML();
            // TODO check incompatible client  by doing a divChecker validation.
	        this.newSnapshot = this._textarea.innerHTML;
			this.title = obj.title;
			this._title.value = this.title;
	        for(var i in obj.attendees){
	            var o = {
	                value: {
	                    'site':i,
	                    'name':obj.attendees[i]['name'],
	                    'color':obj.attendees[i]['color']
	                }
	            };
	            this._attendeeList.onRemoteUserJoin(o);
	        }
	    }
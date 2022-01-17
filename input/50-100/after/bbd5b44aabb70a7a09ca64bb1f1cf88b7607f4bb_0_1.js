function() {
		// summary:		Show the window.
                if(dijit.byId(this.divname).domNode.style.visibility == 'hidden')
                    dijit.byId(this.divname).show();
                
                console.log(dijit.byId(this.divname));
	}
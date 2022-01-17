function(){
	        this.collab = coweb.initCollab({id : this.id});  
	        this.collab.subscribeReady(this,'onCollabReady');
            this.collab.subscribeSync('change.*', this, 'onTreeUpdate');
			this.collab.subscribeSync('editorTitle', this, '_onRemoteTitle');
	        this.collab.subscribeStateRequest(this, 'onStateRequest');
	    	this.collab.subscribeStateResponse(this, 'onStateResponse');
	        dojo.connect(this._textarea, 'onfocus', this, '_onFocus');
	        dojo.connect(this._textarea, 'onblur', this, '_onBlur');
	        dojo.connect(this.url,'onclick',this,function(e){ this.selectElementContents(e.target) });
            dojo.connect(this.url,'onblur',this,function(e){ e.target.innerHTML = window.location; });
	        dojo.connect(window, 'resize', this, 'resize');
	        // dojo.connect(dojo.byId('saveButton'),'onclick',this,function(e){
	        //     dojo.publish("shareClick", [{}]);
	        // });
	        attendance.subscribeChange(this, 'onUserChange');
            QWE = this;
	    }
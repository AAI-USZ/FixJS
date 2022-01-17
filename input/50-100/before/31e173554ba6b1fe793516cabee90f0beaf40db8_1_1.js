function(clientState, ev, val){
		this._currentPage = val;
		// write out who this is
		this.element.html("Loading ...")
			.scrollTop(0);
		Doc.findOne({
			name: val
		}, this.proxy(function(docData){
			if(Doc.dataDeferred.isResolved()){
				this.show(docData)
			} else {
				Doc.dataDeferred.then(this.proxy('show',docData))
			}
		}));
		
	}
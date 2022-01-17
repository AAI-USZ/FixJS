function(	/* Object */ keywordArgs,
							  /* Function */ findCallback,
							  /* Function */ errorCallback){
		//	summary:
		//		See dojo.data.util.simpleFetch.fetch()
		var self = this;

		if(this._loadFinished){
			this.filter(keywordArgs, this._getItemsArray(keywordArgs.queryOptions), findCallback);
		}else{
			//Do a check on the JsonFileUrl and crosscheck it.
			//If it doesn't match the cross-check, it needs to be updated
			//This allows for either url or _jsonFileUrl to he changed to
			//reset the store load location.  Done this way for backwards
			//compatibility.  People use _jsonFileUrl (even though officially
			//private.
			if(this._jsonFileUrl !== this._ccUrl){
				kernel.deprecated(this.declaredClass + ": ",
					"To change the url, set the url property of the store," +
						" not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
				this._ccUrl = this._jsonFileUrl;
				this.url = this._jsonFileUrl;
			}else if(this.url !== this._ccUrl){
				this._jsonFileUrl = this.url;
				this._ccUrl = this.url;
			}

			//See if there was any forced reset of data.
			if(this.data != null){
				this._jsonData = this.data;
				this.data = null;
			}

			if(this._jsonFileUrl){
				//If fetches come in before the loading has finished, but while
				//a load is in progress, we have to defer the fetching to be
				//invoked in the callback.
				if(this._loadInProgress){
					this._queuedFetches.push({args: keywordArgs, filter: lang.hitch(self, "filter"), findCallback: lang.hitch(self, findCallback)});
				}else{
					this._loadInProgress = true;
					var getArgs = {
						url: self._jsonFileUrl,
						handleAs: "json-comment-optional",
						preventCache: this.urlPreventCache,
						failOk: this.failOk
					};
					var getHandler = xhr.get(getArgs);
					getHandler.addCallback(function(data){
						try{
							self._getItemsFromLoadedData(data);
							self._loadFinished = true;
							self._loadInProgress = false;

							self.filter(keywordArgs, self._getItemsArray(keywordArgs.queryOptions), findCallback);
							self._handleQueuedFetches();
						}catch(e){
							self._loadFinished = true;
							self._loadInProgress = false;
							errorCallback(e, keywordArgs);
						}
					});
					getHandler.addErrback(function(error){
						self._loadInProgress = false;
						errorCallback(error, keywordArgs);
					});

					//Wire up the cancel to abort of the request
					//This call cancel on the deferred if it hasn't been called
					//yet and then will chain to the simple abort of the
					//simpleFetch keywordArgs
					var oldAbort = null;
					if(keywordArgs.abort){
						oldAbort = keywordArgs.abort;
					}
					keywordArgs.abort = function(){
						var df = getHandler;
						if(df && df.fired === -1){
							df.cancel();
							df = null;
						}
						if(oldAbort){
							oldAbort.call(keywordArgs);
						}
					};
				}
			}else if(this._jsonData){
				try{
					this._loadFinished = true;
					this._getItemsFromLoadedData(this._jsonData);
					this._jsonData = null;
					self.filter(keywordArgs, this._getItemsArray(keywordArgs.queryOptions), findCallback);
				}catch(e){
					errorCallback(e, keywordArgs);
				}
			}else{
				errorCallback(new Error(this.declaredClass + ": No JSON source data was provided as either URL or a nested Javascript object."), keywordArgs);
			}
		}
	}
function(){
		//summary:
		//		internal method that checks each inflight XMLHttpRequest to see
		//		if it has completed or if the timeout situation applies.

		var now = (new Date()).getTime();
		// make sure sync calls stay thread safe, if this callback is called
		// during a sync call and this results in another sync call before the
		// first sync call ends the browser hangs
		if(!dojo._blockAsync){
			// we need manual loop because we often modify _inFlight (and therefore 'i') while iterating
			// note: the second clause is an assignment on purpose, lint may complain
			for(var i = 0, tif; i < _inFlight.length && (tif = _inFlight[i]); i++){
				var dfd = tif.dfd;
				var func = function(){
					if(!dfd || dfd.canceled || !tif.validCheck(dfd)){
						_inFlight.splice(i--, 1);
						_pubCount -= 1;
					}else if(tif.ioCheck(dfd)){
						_inFlight.splice(i--, 1);
						tif.resHandle(dfd);
						_pubCount -= 1;
					}else if(dfd.startTime){
						//did we timeout?
						if(dfd.startTime + (dfd.ioArgs.args.timeout || 0) < now){
							_inFlight.splice(i--, 1);
							var err = new Error("timeout exceeded");
							err.dojoType = "timeout";
							dfd.errback(err);
							//Cancel the request so the io module can do appropriate cleanup.
							dfd.cancel();
							_pubCount -= 1;
						}
					}
				};
				if(config.debugAtAllCosts){
					func.call(this);
				}else{
					try{
						func.call(this);
					}catch(e){
						dfd.errback(e);
					}
				}
			}
		}

		_checkPubCount(dfd);

		if(!_inFlight.length){
			clearInterval(_inFlightIntvl);
			_inFlightIntvl = null;
		}
	}
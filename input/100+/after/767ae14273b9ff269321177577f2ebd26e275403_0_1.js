function(deps, runID, reRender) {
		if (runID === undefined)
			throw "missing runID - failed to set up event listeners";
			
		this.dependencies = deps;
		var self = this;
        if (undefined === reRender) {
		    reRender = function() {
			    self.parentController.updateChild(self, runID);
		    };
        }
		for (var i = 0; i < deps.length; ++i) {
			var depChain = deps[i];
			
			var prevFn = function(){};
			for (var j = depChain.length - 1; j >= 0; --j) {
				var fn = (function(j, prevFn) {
					
					return function(data) {
						if (this.ranAlready)
							return;
							
						this.ranAlready = true;
						
						if ( $.isFunction(data()[ depChain[j] ] )
								&& data()[ depChain[j] ].__observable
								&& ! data()[ depChain[j] ].__observable.isIdxVar) {
							var listenerID = data()[ depChain[j] ].on("change", function(newVal){
								prevFn.ranAlready = false;
								prevFn.call(prevFn, newVal);
								reRender()							
							});
							if (self.listeners[runID] === undefined) {
								self.listeners[runID] = [];
							}
							self.listeners[runID].push({
								event: "change",
								id: listenerID,
								owner: data()[ depChain[j] ]
							});
							prevFn.call(prevFn, data()[ depChain[j] ] );
						}
					};
					
				})(j, prevFn);
				prevFn = fn;
			}
			prevFn.call(prevFn, this.varCtx.data);
		}
	}
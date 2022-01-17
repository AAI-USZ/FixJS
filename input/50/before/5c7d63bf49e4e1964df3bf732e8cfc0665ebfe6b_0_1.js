function(){
			// setter params must be pulled afresh from the ContentPane each time
			delete self._contentSetterParams;
			
			if(!isFakeContent){
				if(self._started){
					// Startup each top level child widget (and they will start their children, recursively)
					delete self._started;
					self.startup();
					
					// Call resize() on each of my child layout widgets,
					// or resize() on my single child layout widget...
					// either now (if I'm currently visible) or when I become visible
					self._scheduleLayout();
				}
				self._onLoadHandler(cont);
			}
		}
function (serviceType, callback, options, filter) {
		console.log('INFO: [RPC] '+"findService: searching for ServiceType: " + serviceType.api);
		var results = [];
		var cstar = serviceType.api.indexOf("*");
		if(cstar !== -1){
			//*c*
			if(serviceType.api.lastIndexOf("*") !== 0){
				var len = serviceType.api.length - 1;
				var midString = serviceType.api.substring(1, len);
				for (var i in this.objects){
					if(i.indexOf(midString) != -1) {
						for( var j = 0; j <this.objects[i].length; j++){
							results.push(this.objects[i][j]);
						}
					}
				}
			}
			//*, *c
			else {
				if(serviceType.api.length == 1) {
					for (var i in this.objects){
						for( var j = 0; j <this.objects[i].length;j++){ 
							results.push(this.objects[i][j]);
						}
					}
				}
				else {
					var restString = serviceType.api.substr(1);
					for (var i in this.objects) {
						if(i.indexOf(restString, i.length - restString.length) !== -1)	{
							for( var j = 0; j <this.objects[i].length; j++){
								results.push(this.objects[i][j]);
							}
						}
					}
				}
			}
			callback(results);

		}
		else {
           function deliverResults(r) {
				function isDuplicate(sv, pos) {
					var cnt = 0;
					for (var i=0; i<r.length; i++) {
						if (sv.id === r[i].id & sv.serviceAddress === r[i].serviceAddress) {
							if (i === pos && cnt === 0) {
								return true;
							}
							cnt += 1;
						}
					}
					return false;
				}
				r = r.filter(isDuplicate);
				
				// filter results for zoneId
				if (filter && typeof filter.zoneId === 'object') {
					function hasZoneId(sv) {
						for (var i=0; i<filter.zoneId.length; i++) {
							var found = sv.serviceAddress.indexOf(filter.zoneId[i]) !== -1 ? true : false;
							if (found) return true;
						}
						return false;
					}
					r = r.filter(hasZoneId);
				}
				
				// finally return results
				callback(r);
			}
			
			for (var i in this.objects) {
				if (i === serviceType.api) {
					console.log('INFO: [RPC] '+"findService: found matching service(s) for ServiceType: " + serviceType.api);
					results = this.objects[i];
				}
			} 
			
			// add address where this service is available, namely this pzp/pzh sessionid
			for (var i=0; i<results.length; i++) {
				results[i].serviceAddress = sessionId; // This is source addres, it is used by messaging for returning back
			}
			
			// reference counter of all entities we expect services back from
			var entityRefCount = this.parent.connectedPzh[this.parent.config.pzhId] ? 1 : 0;
			entityRefCount += this.parent.connectedPzp ? Object.keys(this.parent.connectedPzp).length : 0;
			
			// no connection to a PZH & other connected Peers, don't ask for remote services
			if (!this.parent || entityRefCount === 0) { 
				deliverResults(results);
				return;
			}
			
			// store callback in map for lookup on returned remote results
			var callbackId = getNextID();
			var that = this;
			this.remoteServicesFoundCallbacks[callbackId] = (function(res, refCnt) {
				return function(remoteServices, cId) {
					
					function isServiceType(el) {
						return el.api === serviceType.api ? true : false;
					}
					res = res.concat(remoteServices.filter(isServiceType));
					refCnt -= 1;
					
					if (refCnt < 1) {
						// entity reference counter is zero, got all answers, so continue
						deliverResults(res);
						delete that.remoteServicesFoundCallbacks[cId];
					}
				}
			})(results, entityRefCount);
			
			// ask for remote service objects
			if (this.parent.connectedPzh[this.parent.config.pzhId]) {
				this.parent.prepMsg(this.parent.sessionId, this.parent.config.pzhId, 'findServices', {id: callbackId});
			} 
			
			if (this.parent.connectedPzp && Object.keys(this.parent.connectedPzp).length > 0) {
				for (var key in this.parent.connectedPzp) {
					if (this.parent.connectedPzp.hasOwnProperty(key) && key !== this.parent.sessionId) {
						this.parent.prepMsg(this.parent.sessionId, key, 'findServices', {id: callbackId});
					}
				}
			}
		}
	}
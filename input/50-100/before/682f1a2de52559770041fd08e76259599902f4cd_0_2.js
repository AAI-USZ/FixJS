function(){
					//console.log('synced ' + si)	
					var list = segmentIsFinishing[si];
					list.forEach(function(cb){cb();})
					delete segmentIsFinishing[si];
					mws.resume()
					mw.flush()
				}
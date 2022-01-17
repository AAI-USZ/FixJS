function(e){
				//e.params = JSON.parse(e.params)
				//console.log('e.params: ' + JSON.stringify(e.params))
				var viewHandle = s.beginView(e, sendReady.bind(undefined, e));
				_.assertObject(viewHandle)
				viewHandles.push(viewHandle)
			}
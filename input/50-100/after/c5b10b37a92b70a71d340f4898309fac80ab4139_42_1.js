function() {
			console.log('client disconnected')
			ws.end()
			viewHandles.forEach(function(sh){
				sh.end()
			})
			clearInterval(flushHandle)
			//w.flush()
			w.end(undefined, true)
			w = undefined
			connections.splice(connections.indexOf(c), 1)
		}
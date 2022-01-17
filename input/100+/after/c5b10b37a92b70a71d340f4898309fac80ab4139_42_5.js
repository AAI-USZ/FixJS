function(cb){
			var cdl = _.latch(2, function(){
				console.log('all closed')
				cb()
			})
			tcpServer.on('close', function(){
				console.log('tcp server closed')
				cdl()
			})
			console.log('closing tcp server: ' + tcpServer.connections)
			//apparently you cannot close a server until you've destroyed all its connections
			//even if those connections were closed remotely???
			connections.forEach(function(c){c.destroy();})
			tcpServer.close()
			s.close(function(){
				console.log('closed rest')
				cdl()
			})
		}
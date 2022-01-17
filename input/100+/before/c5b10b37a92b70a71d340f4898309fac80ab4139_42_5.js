function(cb){
			var cdl = _.latch(2, function(){
				console.log('all closed')
				cb()
			})
			tcpServer.on('close', function(){
				console.log('tcp server closed')
				cdl()
			})
			tcpServer.close()
			s.close(cdl)
		}
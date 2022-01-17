function(cb){
				//m.close();
				var cdl = _.latch(2, function(){
					console.log('closed server')
					cb()
				})
				apClose(cdl)
				ol.close(cdl)
			}
function(msg){
				console.log('GOT ADD EVENT: ' + new Error().stack)
				out.write(msg.user.name.value()+'> ' + msg.text.value()+'\n')
			}
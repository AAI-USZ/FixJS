function(msg){
				if(msg.user !== user){
					out.write(msg.user.name.value() + '> ' + msg.text.value() + '\n')
				}
			}
function temporaryGenerator(){
			var nt = nextTemporary
			--nextTemporary
			//ws.write('(' + syncId + ') generating temporary: ' + nt+'\n')
			//ws.write(new Error().stack+'\n')
			//console.log('(' + syncId + ') generating temporary: ' + nt+'\n')
			//console.log(new Error().stack+'\n')
			return nt
		}
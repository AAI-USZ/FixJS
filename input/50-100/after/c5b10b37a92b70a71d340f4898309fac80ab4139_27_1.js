function fail(e){
			if(donePassed) return
			log('test failed: ' + t.dirName + '.' + t.name)
			console.log('affe')
			++failedCount
			//console.log(e)
			failedList.push([t.dirName+'.'+t.name, e.stack])
			log(e.stack)
			//process.exit(0)
			finish()
		}
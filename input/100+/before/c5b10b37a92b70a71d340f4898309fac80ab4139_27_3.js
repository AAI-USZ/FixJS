function(t){
		var port = portCounter
		++portCounter;
		inProgress.push(t)
		var testDir = t.dir + '/' + t.name + '_test'

		function done(){
			log('test passed: ' + t.dirName + '.' + t.name)
			++passedCount
			finish()
		}
		function fail(e){
			log('test failed: ' + t.dirName + '.' + t.name)
			++failedCount
			//console.log(e)
			failedList.push([t.dirName+'.'+t.name, e.stack])
			log(e.stack)
			finish()
		}
		done.fail = function(ee){
			if(_.isString(ee)) ee = new Error(ee)
			fail(ee)
		}
		
		var timeoutHandle = setTimeout(function(){
			fail(new Error('test timed out'))
		}, 2000)
		
		function finish(){
			clearTimeout(timeoutHandle)
			var ii = inProgress.indexOf(t)
			inProgress.splice(ii, 1)

			rimraf(testDir, function(err){
				if(err) throw err;
				dieCdl()
			})
		}
		
		function doTest(){
			try{
				t.test(t.dir, testDir, port, done)
			}catch(e){
				fail(e)
			}
		}
		function makeDir(){
			//log('making dir: ' + testDir)
			fs.mkdir(testDir, function(err){
				if(err){
					if(err.code === 'EEXIST'){
						//log('making - with rimraf')
						rimraf(testDir, function(err){
							makeDir()
						})
						return;
					}else{
						throw err;
					}
				}
			
				doTest()
			})
		}
		makeDir()
	}
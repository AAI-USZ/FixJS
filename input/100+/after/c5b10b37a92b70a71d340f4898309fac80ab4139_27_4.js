function moreCont(doneCb){	

	var passedCount = 0;
	var failedCount = 0;
	
	var failedList = []
	//var dieCdl = _.latch(tests.length, function(){
	function die(){
		console.log('all tests finished: ' + passedCount + '/' + (failedCount+passedCount));
		console.log('took ' + (Date.now()-start)+'ms.')
		if(failedList.length > 0){
			console.log('failed: ')
			failedList.forEach(function(f){
				console.log(f[0] + ' failed')
				console.log(f[1])
			})
		}
		doneCb()
	}
	//})
	
	var inProgress = []
	
	process.on('uncaughtException', function(e){
		console.log('got uncaught exception')
		//throw new Error(e)
		currentFail(e)
	})
	
	var currentTest;
	var currentFail
	function runNextTest(){
		if(tests.length === 0){
			die()
		}
		var t = tests.shift()
		currentTest = t
		runTest(t, runNextTest)
	}
	runNextTest()
	
	function runTest(t, cb){
		var port = portCounter
		++portCounter;
		inProgress.push(t)
		var testDir = t.dir + '/' + t.name + '_test'

		var donePassed
		function done(){
			log('test passed: ' + t.dirName + '.' + t.name)
			console.log('asse')
			donePassed = true
			++passedCount
			finish()
		}
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
		currentFail = fail
		done.fail = function(ee){
			if(_.isString(ee)) ee = new Error(ee)
			fail(ee)
		}
		
		var timeoutHandle = setTimeout(function(){
			fail(new Error('test timed out'))
		}, 4000)
		
		function finish(){
			clearTimeout(timeoutHandle)
			var ii = inProgress.indexOf(t)
			inProgress.splice(ii, 1)

			rimraf(testDir, function(err){
				if(err){
					rimraf(testDir, function(err){
						if(err) throw err;
					})
				}
				//dieCdl()
				cb()
			})
		}
		
		function doTest(){
			try{
				var config = {schemaDir: t.dir, dataDir: testDir, port: port}
				console.log('callling')
				t.test(config, done)
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
							if(err) throw err
							makeDir()
						})
						return;
					}else{
						throw new Error('mkdir error: ' + err);
					}
				}
			
				doTest()
			})
		}
		makeDir()
	}
}
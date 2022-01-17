function(err){
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
			}
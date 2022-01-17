function(err){
					if(err) throw err
					//console.log('unlocked segmentation file: ' + path + '.segmentation')
					fs.close(segmentationFd, function(){
						cdl()
						console.log('finished close')
						mw.end(function(){console.log('finished mw');cdl()})
						//mws.end(function(){console.log('finished mws');cdl()});
					})
				}
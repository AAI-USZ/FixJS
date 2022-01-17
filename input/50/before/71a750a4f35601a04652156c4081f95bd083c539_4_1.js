function(error, compressedRun) {
					fs.writeFile(DATADIR+userID+'/'+runID+'.json.gz', compressedRun);
				}
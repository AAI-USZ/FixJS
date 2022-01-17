function(error, compressedRun) {
					fs.writeFile(DATADIR+user.userID+'/'+runID+'.json.gz', compressedRun);
				}
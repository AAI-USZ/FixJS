function(e){
			++count;
			//console.log(olLatestVersionId + ' reading: ' + key)
			//console.log(rf)
			if(count >= olLatestVersionId){
				rf(e, count)
			}else{
				console.log('skipping: ' + count)
			}
		}
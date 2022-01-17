function(){			
			if(failed) return;
			alreadyDone = true;
			console.log('done getting view state:'+ typeCode)
			doneCb(obj);
		}
function(){
			ctestui.log('docommand error try '+ctest.notHereCounter+', command '+command)
			try{
				ctest.execCommand(command)
			}
			catch(e){ // errors
				// first option, may appear later, keep trying.
				// call the failure option
				ctest.pageLoaded=false
				ctest.errorOnNext=0
				onSuccess()
				return
			}
			if ( ctest.notHereCounter>0 ){
				ctest.notHereCounter-=1
				ctest.setFunctionForNextRound(doMyCommand)
				return;
			}
			onFailure({text:'No error appeared'})
		}
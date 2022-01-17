function(){
			//ctestui.debug('docommand try '+ctest.notHereCounter+', command '+command)
			try{
				//ctestui.debug('>doeval -- '+'commands.do'+$.toJSON(command))
				ctest.execCommand(command)
				//ctestui.debug('<doeval -- '+'commands.do'+$.toJSON(command))
			}
			catch(e){ // errors
				//ctestui.debug('!<doeval -- '+'commands.do'+$.toJSON(command))
				// first option, may appear later, keep trying.
				if ( e.may_appear_later && (ctest.notHereCounter>0) ){
					ctest.notHereCounter-=1
					ctest.setFunctionForNextRound(doMyCommand)
					return;
				}
				if (!e.may_appear_later)
					ctestui.log('Error that is not solvable later')
				// call the failure option
				onFailure(e)
				throw(e)
			}
			ctest.pageLoaded=false
			onSuccess()
		}
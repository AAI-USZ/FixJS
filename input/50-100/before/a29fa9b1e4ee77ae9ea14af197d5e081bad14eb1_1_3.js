function(msg, ok){
		ctest.running=false
		if (ok){
			$('body').first().addClass('all_test_passed')
			ctestui.log(msg)
			if (ctest.atEnd)
				ctest.atEnd()
		}
		else{
			$('body').first().addClass('failed_tests')
			ctestui.log(msg,'error')
		}
		ctest.runningCycle=false
		throw ({'stop':true})
	}
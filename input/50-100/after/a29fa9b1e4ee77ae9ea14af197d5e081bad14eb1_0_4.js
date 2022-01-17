function(reg){
		if (!ctest.lastConfirm){
			throw( { may_appear_later : true, text : 'No confirmation yet' } )
		}
		ctestui.log('confirm appeared with text: '+ctest.lastConfirm); 

		if (reg){
			re=RegExp(reg)
			if (!ctest.lastConfirm.match(re))
				throw( { may_appear_later : false, text : 'Wrong confirm found, waiting for'+reg+', found '+txt } )
		}
		ctest.lastConfirm=false
		ctest.nextConfirm=undefined
	}
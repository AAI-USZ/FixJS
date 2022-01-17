function(reg){
		if (!ctest.lastPrompt){
			throw( { may_appear_later : true, text : 'No prompt yet' } )
		}
		if (reg){
			re=RegExp(reg)
			if (!re.match(ctest.lastPrompt))
				throw( { may_appear_later : false, text : 'Wrong prompt found, waiting for'+reg+', found '+txt } )
		}
		ctest.lastPrompt=false
		ctest.nextPrompt=undefined
	}
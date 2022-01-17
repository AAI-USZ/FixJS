function(reg){
		if (!ctest.lastAlert){
			throw( { may_appear_later : true, text : 'No alert yet' } )
		}
		if (reg){
			re=RegExp(reg)
			if (!re.match(ctest.lastAlert))
				throw( { may_appear_later : false, text : 'Wrong alert found, waiting for'+reg+', found '+txt } )
		}
		ctest.lastAlert=false
		ctest.nextAlert=undefined
	}
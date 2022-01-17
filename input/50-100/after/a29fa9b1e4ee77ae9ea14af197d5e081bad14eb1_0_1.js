function(i){
			thistext=$(this).text().replace(/[ ]*$/,'').replace(/^[ ]*/,'')
			if (thistext.match(RegExp('^'+ltext+'$')))
				el.push(this)
		}
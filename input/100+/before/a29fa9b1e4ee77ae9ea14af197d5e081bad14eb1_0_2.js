function(el, txt){
		var el=$$$(el)
		var val=$$$('option='+txt).val()
		//ctestui.log('select '+el)
		el.val(val)
		var ev=$('iframe')[0].contentDocument.createEvent('HTMLEvents')
		ev.initEvent('change',true,true)
		el[0].dispatchEvent(ev)

		var oncl=el.attr('onchange')
		if (oncl){
			with( frames[0].window ){
				oncl()
			}
		}
	}
function(event, el, checkBoxEl) {
		if(!el.hasClass('xSaving')) {
			checkBoxEl.toggleClass('checked');
			var value = checkBoxEl.hasClass('checked') ? "1" : "0";
			
			if (el.hasClass('xProperty-fixed')){
				var entry = el.getParent('.xEntry');
				if (value=="1"){
					entry.addClass('xFixed');
				}else{
					entry.removeClass('xFixed');
				}
			}
			
			this.elementEdit_save(null, el, null, null, value, value);
		}
	}
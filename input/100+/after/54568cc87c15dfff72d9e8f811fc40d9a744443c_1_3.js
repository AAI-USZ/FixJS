function(event, el, checkBoxEl) {
		if(!el.hasClass('xSaving')) {
			checkBoxEl.toggleClass('checked');
			var value = checkBoxEl.hasClass('checked') ? "1" : "0";
			
			if (el.hasClass('xProperty-fixed')){
				var entry = el.getParent('.xEntry');
				if (value=="1"){
					entry.addClass('xFixed');
					if(this.container.hasClass('xCentered')) {
						var left = parseInt(entry.getStyle('left')) + (window.getSize().x - this.container.getSize().x) / 2;
		                entry.setStyle('left', left + 'px');
		            }
				}else{
					entry.removeClass('xFixed');
					if(this.container.hasClass('xCentered')) {
						var left = parseInt(entry.getStyle('left')) - (window.getSize().x - this.container.getSize().x) / 2;
		                entry.setStyle('left', left + 'px');
		            }
				}
			}
			
			this.elementEdit_save(null, el, null, null, value, value);
		}
	}
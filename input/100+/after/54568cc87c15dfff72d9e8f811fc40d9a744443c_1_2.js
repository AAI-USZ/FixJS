function(el) {

						$('xTopPanelContainer').show();
						this.hideControlPanel(el);
					    $('xCoords').destroy();
				       	el.removeClass('xEditing');

				       	var editor = this;

				       	if (dragAll){			       	
							allEntries.each(function(entry){
								var value = parseInt(entry.getStyle('left')) + ',' + parseInt(entry.getStyle('top'));
								editor.elementEdit_save(null, entry, null, null, value, value);							
							});				       	
				       		
					    }else{
					    	if(this.container.hasClass('xCentered') && el.hasClass('xFixed')) {
					    		var left = parseInt(el.getStyle('left')) - (window.getSize().x - this.container.getSize().x) / 2;
					    	} else {
					    		var left = parseInt(el.getStyle('left'));
					    	}
							var value = left + ',' + parseInt(el.getStyle('top'));
							this.elementEdit_save(null, el, null, null, value, value);
						}
						dragAll = false;

				    }
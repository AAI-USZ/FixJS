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
							var value = parseInt(el.getStyle('left')) + ',' + parseInt(el.getStyle('top'));
							this.elementEdit_save(null, el, null, null, value, value);
						}
						dragAll = false;

				    }
function(j){
				var newName = $(this).attr('name')
				if (newName && newName.length){
					newName = newName.replace(/([-_a-zA-Z0-9\[\]]+)\[\d+\](\[[-_a-zA-Z0-9]+\])$/, '$1[' + i + ']$2');
					
					// required for jquery 
					newName = newName.replace('[', '\[');
					newName = newName.replace(']', '\]');
					
					$(this).attr('name', newName)
				}
				
				if ($(this).is('label')){
					parseAttribute(this, 'for');
				} else {
					parseAttribute(this, 'id');
				}
			}
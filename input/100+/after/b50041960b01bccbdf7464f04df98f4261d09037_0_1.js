function(idx, changes){
	    		switch (changes.method) {
				case 'set':
					$.each(changes.actions, function(index, value){
		        		$('#' + index).text(value);
		    		});
					break;
				case 'remove':
					$.each(changes.actions, function(index, value){
						$('#' + value).animate({							
								height: 0
							}, 1000, function() {
								openZIMtinyMce.removeChildEditors(this);
								$(this).remove();
							}
						);
					});
					break;
				default:
					break;
				}
    		}
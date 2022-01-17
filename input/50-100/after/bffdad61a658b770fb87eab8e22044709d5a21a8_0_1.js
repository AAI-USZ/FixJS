function() {
						if($(this)[0] == $(target)[0] || $(target).parent().is($(this))) {
							checker = true;
						} else {
							//console.log($(this));
						}
					}
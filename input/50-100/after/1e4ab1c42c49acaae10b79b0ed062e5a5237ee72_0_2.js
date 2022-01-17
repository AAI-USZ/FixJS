function(e){
							var w = ( document.width - $('.slides').width() ) / 2;
							var x = e.clientX - w;
							
							$span.css({
								'top' : bHandler.round(e.clientY-80, 45),
								'left' : bHandler.round(x, 10)
							});
						}
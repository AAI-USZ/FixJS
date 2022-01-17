function svgIsInCy( svgDomElement ){
					var $ele = $(svgDomElement);
					var inside = false;
					
					$ele.parents().each(function(){
						if( this == $container[0] ){
							inside = true;
						}
					});
					
					return inside;
				}
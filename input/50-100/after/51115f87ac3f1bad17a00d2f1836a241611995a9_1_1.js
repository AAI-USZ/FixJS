function svgIsInCy( svgDomElement ){
					var $ele = $(svgDomElement);
					var inside = false;
					var $parents = $ele.parents();

					for( var i = 0; i < $parents.length; i++ ){
						var parent = $parents[i];

						if( parent == $container[0] ){
							inside = true;
							break;
						}
					}
					
					return inside;
				}
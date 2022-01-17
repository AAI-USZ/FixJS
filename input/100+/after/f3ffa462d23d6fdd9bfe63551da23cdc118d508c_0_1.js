function() {

		var ps = w.document.getElementsByTagName( "div" );

		

		// Loop the pictures

		for( var i = 0, il = ps.length; i < il; i++ ){

			if( ps[ i ].getAttribute( "data-picture" ) !== null ){



				var sources = ps[ i ].getElementsByTagName( "div" ),

					matches = [];

			

				// See if which sources match

				for( var j = 0, jl = sources.length; j < jl; j++ ){

					var media = sources[ j ].getAttribute( "data-media" );

					// if there's no media specified, OR w.matchMedia is supported 

					if( !media || ( w.matchMedia && w.matchMedia( media ).matches ) ){

						matches.push( sources[ j ] );

					}

				}



				// Find any existing img element in the picture element

				var picImg = ps[ i ].getElementsByTagName( "img" )[ 0 ];



				if( matches.length ){			

					if( !picImg ){

						picImg = w.document.createElement( "img" );

						picImg.alt = ps[ i ].getAttribute( "data-alt" );

						ps[ i ].appendChild( picImg );

					}

					

					var match = matches.pop();

					picImg.src =  match.getAttribute( "data-src" );



					//Preserve any css classnames associated with the match as well as the img fallback

					if(picImg.className !== match.className){

						picImg.className = match.className;

					}

				}

				else if( picImg ){

					ps[ i ].removeChild( picImg );

				}



				//Remove all class attributes from the list of data sources to prevent unwanted rendering of hidden elements

				for( var j = 0, jl = sources.length; j < jl; j++ ){

					sources[ j ].removeAttribute('class');

				}

			}

		}

	}
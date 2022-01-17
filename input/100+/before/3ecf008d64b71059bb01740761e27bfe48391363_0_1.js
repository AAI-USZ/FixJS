f
			var resp = {};

			if( !error ) {

				if( response.statusCode == 200 ) {

					var _in = body.split("\n"),
						_out = [];

					var past_costumes_decl = false;

					while( _in.length ) {
						var l = _in.shift();

						// strip comments
						l = l.replace( /(.*)\s*--.*/, "$1" );

						// lines to remove
						if(!(
							   /^\s*$/.test(l)				// blank lines
							|| /= require/.test(l)		// requires
							|| /\.sheet/.test(l)
							|| /\(sheet\)/.test(l)		// anything to do with sheets
							|| /^\s*end\s*$/.test(l)	// end of function ( that was removed )
							|| /return /.test(l)		// not returning anything
							|| /beam:/.test(l)			// mmmm beams...
							|| /local new_plyr/.test(l) // remove redeclaration of plyr
						)) {

							// fix objects
							if(    /\{name.*sheet.*\}/.test(l)
							 	|| /^\s*[a-z]+\s=\s\{\s*$/i.test(l)
							)
								l = l.replace( /=/g ,':');

							// variables
							l = l.replace( /local /, 'var ' );

							// love specific code
							l = l.replace( /love\.graphics\.newImage\((.*)\)/, '$1' );
							l = l.replace( 'new_plyr', 'plyr' );

							// the meat
							if( /anim8\.newAnimation/.test(l) ) {

								l = l.replace( /anim8\.newAnimation\((.*)\)/, "[ $1 ]" );
								l = l.replace( /=/g , ':' );

								var middle = false;
								if( /g\(.*\)/.test(l) )
									middle = l.replace( /^.*g\(\s*(.*)\s*\).*$/, "$1" );
								if( /warp\(.*\)/.test(l) )
									middle = l.replace( /^.*warp\(\s*(.*)\s*\).*$/, '$1' );
								if( middle ) {
									// parse the params
									// fix the non quoted syntax
									if( /^\d*,\d*$/.test(middle) ) middle = '\'' + middle + '\'';
									// replace all single quotes
									middle = middle.replace( /'/g, '"' );
									var parsed = middle.splitCSV(),
										new_middle = [];
									for( var i in parsed ) {
										if( /^\d*,\d*$/.test( parsed[i] ) ) {
											new_middle.push( parsed[i] );
										} else {
											var x_min, x_max, y_min, y_max, xy, x, y;
											xy = parsed[i].split(',');
											x = xy[0].split('-');
											y = xy[1].split('-');
											x_min = ( x[0] * 1 );
											x_max = ( x[ x.length - 1 ] * 1 );
											y_min = ( y[0] * 1 );
											y_max = ( y[ y.length - 1 ] * 1 );
											for( var _x = x_min; _x <= x_max; _x++ ) {
												for( var _y = y_min; _y <= y_max; _y++ ) {
													new_middle.push( _x + ',' + _y );
												}
											}
										}
									}
									l = l.replace( /g\((.*)\)/, JSON.stringify( new_middle ) );
									l = l.replace( /warp\((.*)\)/, JSON.stringify( new_middle ) );
								}

							}

							// costume object to array
							if( /plyr\.costumes = \{/.test(l) ) {
								past_costumes_decl = true;
								l = l.replace( /plyr\.costumes = \{/, 'plyr.costumes = [' );
							}
							if( /^\s*\}\s*$/.test(l) && past_costumes_decl == true ) {
								past_costumes_decl = false;
								l = l.replace( /^\s*\}\s*$/, ']' );
							}

							_out.push( l );
						}
					}

					//console.log( _out );

					try {
						eval( _out.join("\n") );
					} catch( e ) {
						resp.parseError = e;
					}

					if( plyr instanceof Object && !resp.parseError ) {
						resp.result = 'success';
						resp.data = plyr;
					} else {
						resp.result = 'parse error';
					}

				} else {

					resp.result = 'unknown character';

				}

				resp.code = response.statusCode;

			} else {
				resp.result = 'invalid request';
			}

			res.send( '<pre>' + syntaxHighlight( resp ) + '</pre>' );
		}

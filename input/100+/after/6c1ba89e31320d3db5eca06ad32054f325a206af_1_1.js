f			
			// build octree with max count objects
			
			for ( var i = 0; i < countMax; i++ ) {
				
				testObj = new _Model.Instance( {
					geometry: new THREE.CubeGeometry( 50, 50, 50 ),
					material: new THREE.MeshBasicMaterial( { color: 0xFF0000 } )
				} );
				
				testObj.position.set( Math.random() * ( radius * 2 ) - radius, Math.random() * ( radius * 2 ) - radius, Math.random() * ( radius * 2 ) - radius );
				//testObj.position.set( Math.random() * -radius * 0.5, Math.random() * -radius * 0.5, Math.random() * -radius * 0.5 );
				//testObj.position.set( -radius + Math.random() * -radius * 0.25, -radius + Math.random() * -radius * 0.25, -radius + Math.random() * -radius * 0.25 );
				//testObj.position.set( Math.random() * ( radius * 10 ) - radius * 5, Math.random() * ( radius * 10 ) - radius * 5, Math.random() * ( radius * 10 ) - radius * 5 );
				
				objects.push( testObj );
				scene.add( testObj );
				
			}
			
			var ta = new Date().getTime();
			
			for ( var i = 0; i < objects.length; i++ ) {
				
				octree.add( objects[ i ] );
				
			}
			
			var tb = new Date().getTime();
			
			console.log( 'OCTREE BUILD time: ', ( tb - ta ) );
			
			// search octree
			
			var searchRad = 1000,
				testObj = new _Model.Instance( {
					geometry: new THREE.CubeGeometry( searchRad * 2, searchRad * 2, searchRad * 2 ),
					material: new THREE.MeshBasicMaterial ( { color: 0xFF000, opacity: 0.15, transparent: true } )
				} ),
				testLineGeom = new THREE.Geometry(),
				testLine;
			
			testLineGeom.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 1, 0 ) );
			testLine = new THREE.Line( testLineGeom, new THREE.LineBasicMaterial( { color: 0xFF00FF, linewidth: 8 } ), THREE.LinePieces );
			testLine.useQuaternion = true;
			
			//scene.add( testObj );
			scene.add( testLine );
			
			var testCompare = function ( a, b ) {
				
				var i, l,
					delta = new THREE.Vector3();
				
				for ( i = 0, l = 20; i < l; i++ ) {
					
					delta.add( a.position || a.matrix.getPosition(), b.position || b.matrix.getPosition() );
					
				}
				
			};
			
			var testCount = 0;
			var testCountMax = 1;
			var searchesPerTest = 1;
			var searchObjects = [];
			var searchDirection = new THREE.Vector3( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 ).normalize();
			var testIntervalID = setInterval( function () {
				
				if ( testCount === testCountMax ) {
					
					clearInterval( testIntervalID );
					return;
					
				}
				
				testCount++;
				
				var avgObjectCount = 0;
				
				var tc = new Date().getTime();
				
				for ( var i = 0, l = searchesPerTest; i < l; i++ ) {
					
					// clean previous search objects
					
					if ( searchObjects.length > 0 ) {
						
						for ( var m = 0, n = searchObjects.length; m < n; m++ ) {
							
							searchObjects[ m ].object.material.color.setRGB( 255, 0, 0 );
							
						}
						
					}
					
					// new test position
					
					//testObj.position.set( Math.random() * ( radius * 10 ) - radius * 5, Math.random() * ( radius * 10 ) - radius * 5, Math.random() * ( radius * 10 ) - radius * 5 );
					testObj.position.set( Math.random() * ( radius * 2 ) - radius, Math.random() * ( radius * 2 ) - radius, Math.random() * ( radius * 2 ) - radius );
					testLine.position.copy( testObj.position );
					
					testLine.scale.set( 1, 1, 1 ).multiplyScalar( searchRad );
					var qshift = _VectorHelper.q_to_axis( searchDirection, testLine.up );
					if ( qshift instanceof THREE.Quaternion ) {
						testLine.quaternion.multiplySelf( qshift );
					}
					testLine.quaternion.multiplyVector3( testLine.up.set( 0, 1, 0 ) );
					
					
					var startSphere = new THREE.Mesh( new THREE.SphereGeometry( 75 ), new THREE.MeshBasicMaterial( { color: 0xFF0000, transparent: true, opacity: 0.3 } ) );
					startSphere.position.copy( testObj.position );
					scene.add( startSphere );
					
					var endSphere = new THREE.Mesh( new THREE.SphereGeometry( 75 ), new THREE.MeshBasicMaterial( { color: 0x00FF00, transparent: true, opacity: 0.3 } ) );
					endSphere.position.copy( searchDirection ).multiplyScalar( searchRad ).addSelf( testObj.position );
					scene.add( endSphere );
					
					
					// search octree
					
					searchObjects = octree.search( testObj.position, searchRad, false, searchDirection );
					avgObjectCount += searchObjects.length;
					for ( var m = 0, n = searchObjects.length; m < n; m++ ) {
						
						var so = testCompare( testObj, searchObjects[ m ] );
						searchObjects[ m ].object.material.color.setRGB( 0, 255, 0 );
						
					}
					
					// search all objects
					
					//avgObjectCount += objects.length;
					//for ( var m = 0, n = objects.length; m < n; m++ ) {
						
					//	var so = testCompare( testObj, objects[ m ] );
					//	objects[ m ].material.color.setRGB( 0, 255, 0 );
						
					//}
					//console.log( ' OCTREE SEARCH from ', testObj.position.x, testObj.position.y, testObj.position.z, ' w direction ', searchDirection.x, searchDirection.y, searchDirection.z, ' + radius: ', searchRad, ' gives objects ', searchObjects );
					
				}
				
				avgObjectCount = avgObjectCount / searchesPerTest;
				
				var td = new Date().getTime();
				
				console.log( 'OCTREE SEARCH time: ', (td - tc ), ' + avgObjectCount ', avgObjectCount );
				
			}, 100 );
			
			/*
			var addRemoveTest = true;
			var facesTest = false;
			var adding = true;
			//var intervalID = setInterval( function () {
			//dojo.subscribe( 'Game.update', function () {
			dojo.subscribe( 'oninputrelease', function () {
				
				// adding/removing static
				if ( addRemoveTest === true ) {
					
					// if is adding
					
					if ( adding === true ) {
						
						// add new
						
						if ( facesTest === true ) {
							
							var ta = new Date().getTime();
							
							testObj = new _Model.Instance( {
								geometry: new THREE.SphereGeometry( radius * 10, 50, 50 ),
								material: new THREE.MeshNormalMaterial()// { color: 0x00FF00, wireframe: true, wireframeLinewidth: 10 } )
							} );
							
							octree.add( testObj, true );
							
							var tb = new Date().getTime();
			
							console.log( 'OCTREE faces BUILD time: ', ( tb - ta ) );
							
						}
						else {
							
							testObj = new _Model.Instance( {
								geometry: new THREE.CubeGeometry( 50, 50, 50 ),
								material: new THREE.MeshNormalMaterial()// { color: 0x00FF00, wireframe: true, wireframeLinewidth: 10 } )
							} );
							
							//testObj.position.set( Math.random() * ( radius * 1.5 ) - radius * 0.75, radius * 0.2 + Math.random() * radius * 0.6, Math.random() * ( radius * 1.5 ) - radius * 0.75 );
							//testObj.position.set( Math.random() * ( radius * 1.5 ) - radius * 0.75, Math.random() * ( radius * 1.5 ) - radius * 0.75, Math.random() * ( radius * 1.5 ) - radius * 0.75 );
							//testObj.position.set( Math.random() * -radius * 0.5, Math.random() * -radius * 0.5, Math.random() * -radius * 0.5 );
							//testObj.position.set( -radius + Math.random() * -radius * 0.25, -radius + Math.random() * -radius * 0.25, -radius + Math.random() * -radius * 0.25 );
							testObj.position.set( Math.random() * ( radius * 10 ) - radius * 5, Math.random() * ( radius * 10 ) - radius * 5, Math.random() * ( radius * 10 ) - radius * 5 );
							
							octree.add( testObj );
							
						}
						
						objects.push( testObj );
						scene.add( testObj );
						
						// if at max
						
						if ( objects.length === countMax ) {
							
							adding = false;
							
						}
						
					}
					// else is removing
					else {
						
						testObj = objects.shift();
						
						scene.remove( testObj );
						octree.remove( testObj );
						
						// if at min
						
						if ( objects.length === 0 ) {
							
							adding = true;
							
						}
						
					}
					
				}
				// moving test
				else {
					
					if ( objects.length !== countMax ) {
						
						// add new
						
						testObj = new _Model.Instance( {
							geometry: new THREE.CubeGeometry( 50, 50, 50 ),
							material: new THREE.MeshNormalMaterial()// { color: 0x00FF00, wireframe: true, wireframeLinewidth: 10 } )
						} );
						
						// position
						
						testObj.position.set( Math.random() * ( radius * 10 ) - radius * 5, Math.random() * ( radius * 10 ) - radius * 5, Math.random() * ( radius * 10 ) - radius * 5 );
						
						// add as last
						
						octree.add( testObj );
						objects.push( testObj );
						scene.add( testObj );
						
					}
					else {
						
						for ( var i = 0, l = objects.length; i < l; i++ ) {
							
							testObj = objects[ i ];
							
							//testObj.position.x += 10;
							//testObj.position.y += 10;
							testObj.position.z += 10;
							
						}
						
						octree.update();
						
					}
					
				}
				
				console.log( ' ============================================================================================================');
				console.log( ' OCTREE: ', octree );
				console.log( ' ... depth ', octree.depth, ' vs depth end?', octree.depth_end() );
				console.log( ' ... num octrees: ', octree.octree_count_end() );
				console.log( ' ... total objects: ', octree.object_count_end(), ' vs tree objects length: ', octree.objects.length );
				//octree.to_console();
				console.log( ' ============================================================================================================');
				console.log( ' ');
				
			} );
			//}, 1000 );
			*/
		}, 1000 );

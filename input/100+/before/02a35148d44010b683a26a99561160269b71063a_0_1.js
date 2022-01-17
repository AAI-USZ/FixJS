function setupMorphTargets ( material, geometryGroup, object ) {

		// set base

		var attributes = material.program.attributes;

		if ( object.morphTargetBase !== - 1 ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ object.morphTargetBase ] );
			_gl.vertexAttribPointer( attributes.position, 3, _gl.FLOAT, false, 0, 0 );

		} else if ( attributes.position >= 0 ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglVertexBuffer );
			_gl.vertexAttribPointer( attributes.position, 3, _gl.FLOAT, false, 0, 0 );

		}

		if ( object.morphTargetForcedOrder.length ) {

			// set forced order

			var m = 0;
			var order = object.morphTargetForcedOrder;
			var influences = object.morphTargetInfluences;

			while ( m < material.numSupportedMorphTargets && m < order.length ) {

				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ order[ m ] ] );
				_gl.vertexAttribPointer( attributes[ "morphTarget" + m ], 3, _gl.FLOAT, false, 0, 0 );

				if ( material.morphNormals ) {

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphNormalsBuffers[ order[ m ] ] );
					_gl.vertexAttribPointer( attributes[ "morphNormal" + m ], 3, _gl.FLOAT, false, 0, 0 );

				}

				object.__webglMorphTargetInfluences[ m ] = influences[ order[ m ] ];

				m ++;
			}

		} else {

			// find most influencing

			var used = [];
			var candidateInfluence = - 1;
			var candidate = 0;
			var influences = object.morphTargetInfluences;
			var i, il = influences.length;
			var m = 0;

			if ( object.morphTargetBase !== - 1 ) {

				used[ object.morphTargetBase ] = true;

			}
            
            var gonnaUse = [];
            
            for ( i = 0; i < il; i ++ ) {
                var candidateInfluence = influences[ i ]
				if ( candidateInfluence > 0 ) {
                    gonnaUse.push(i);
				}
			}
            
            if ( gonnaUse.length >  material.numSupportedMorphTargets){
				gonnaUse.sort(sortNumerical);
				gonnaUse.length = material.numSupportedMorphTargets 
            } else if (gonnaUse.length >  material.numSupportedMorphNormals){
            	gonnaUse.sort(sortNumerical);
            } else if (gonnaUse.length = 0){
				gonnaUse.push(0);
            };

			while ( m < material.numSupportedMorphTargets ) {

			/*	for ( i = 0; i < il; i ++ ) {

					if ( !used[ i ] && influences[ i ] > candidateInfluence ) {

						candidate = i;
						candidateInfluence = influences[ candidate ];

					}

				}
*/

                if (gonnaUse[m] !== undefined || m === 0){
    				_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphTargetsBuffers[ gonnaUse[m] ] );
    				_gl.vertexAttribPointer( attributes[ "morphTarget" + m ], 3, _gl.FLOAT, false, 0, 0 );
    
    				if ( material.morphNormals ) {
    
    					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.__webglMorphNormalsBuffers[ gonnaUse[m] ] );
    					_gl.vertexAttribPointer( attributes[ "morphNormal" + m ], 3, _gl.FLOAT, false, 0, 0 );
    
    				}
    
    				object.__webglMorphTargetInfluences[ m ] = influences[ gonnaUse[m]];
                } else {
                    _gl.vertexAttribPointer( attributes[ "morphTarget" + m ], 3, _gl.FLOAT, false, 0, 0 );
                    if ( material.morphNormals ) {
                    	_gl.vertexAttribPointer( attributes[ "morphNormal" + m ], 3, _gl.FLOAT, false, 0, 0 );
                    }
                    object.__webglMorphTargetInfluences[ m ] = 0;
                }
				//used[ candidate ] = 1;
				//candidateInfluence = -1;
				m ++;

			}

		}

		// load updated influences uniform

		if( material.program.uniforms.morphTargetInfluences !== null ) {

			_gl.uniform1fv( material.program.uniforms.morphTargetInfluences, object.__webglMorphTargetInfluences );

		}

	}
function ( camera, lights, fog, material, geometryGroup, object ) {

		if ( material.visible === false ) return;

		var program, attributes, linewidth, primitives, a, attribute;

		program = setProgram( camera, lights, fog, material, object );

		attributes = program.attributes;

		var updateBuffers = false,
			wireframeBit = material.wireframe ? 1 : 0,
			geometryGroupHash = ( geometryGroup.id * 0xffffff ) + ( program.id * 2 ) + wireframeBit;

		if ( geometryGroupHash !== _currentGeometryGroupHash ) {

			_currentGeometryGroupHash = geometryGroupHash;
			updateBuffers = true;

		}

		// render mesh

		if ( object instanceof THREE.Mesh ) {

			var offsets = geometryGroup.offsets;

			for ( var i = 0, il = offsets.length; i < il; ++ i ) {

				if ( updateBuffers ) {

					// vertices

					var positionSize = geometryGroup.vertexPositionBuffer.itemSize;

					_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.vertexPositionBuffer );
					_gl.vertexAttribPointer( attributes.position, positionSize, _gl.FLOAT, false, 0, offsets[ i ].index * positionSize * 4 ); // 4 bytes per Float32

					// normals

					if ( attributes.normal >= 0 && geometryGroup.vertexNormalBuffer ) {

						var normalSize = geometryGroup.vertexNormalBuffer.itemSize;

						_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.vertexNormalBuffer );
						_gl.vertexAttribPointer( attributes.normal, normalSize, _gl.FLOAT, false, 0, offsets[ i ].index * normalSize * 4 );

					}

					// uvs

					if ( attributes.uv >= 0 && geometryGroup.vertexUvBuffer ) {

						if ( geometryGroup.vertexUvBuffer ) {

							var uvSize = geometryGroup.vertexUvBuffer.itemSize;

							_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.vertexUvBuffer );
							_gl.vertexAttribPointer(  attributes.uv, uvSize, _gl.FLOAT, false, 0, offsets[ i ].index * uvSize * 4 );

							_gl.enableVertexAttribArray( attributes.uv );

						} else {

							_gl.disableVertexAttribArray( attributes.uv );

						}

					}

					// colors

					if ( attributes.color >= 0 && geometryGroup.vertexColorBuffer ) {

						var colorSize = geometryGroup.vertexColorBuffer.itemSize;

						_gl.bindBuffer( _gl.ARRAY_BUFFER, geometryGroup.vertexColorBuffer );
						_gl.vertexAttribPointer( attributes.color, colorSize, _gl.FLOAT, false, 0, offsets[ i ].index * colorSize * 4 );


					}

					_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, geometryGroup.vertexIndexBuffer );

				}

				// render indexed triangles

				_gl.drawElements( _gl.TRIANGLES, offsets[ i ].count, _gl.UNSIGNED_SHORT, offsets[ i ].start * 2 ); // 2 bytes per Uint16

				_this.info.render.calls ++;
				_this.info.render.vertices += offsets[ i ].count; // not really true, here vertices can be shared
				_this.info.render.faces += offsets[ i ].count / 3;

			}

		}

	}
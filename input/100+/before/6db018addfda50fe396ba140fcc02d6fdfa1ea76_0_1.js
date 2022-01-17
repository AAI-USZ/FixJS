function () {
        var vertices = [
            // Front face
            -1, -1,  1,
             1, -1,  1,
             1,  1,  1,
            -1,  1,  1,

            // Back face
            -1, -1, -1,
            -1,  1, -1,
             1,  1, -1,
             1, -1, -1,

            // Top face
            -1,  1, -1,
            -1,  1,  1,
             1,  1,  1,
             1,  1, -1,

            // Bottom face
            -1, -1, -1,
             1, -1, -1,
             1, -1,  1,
            -1, -1,  1,

            // Right face
             1, -1, -1,
             1,  1, -1,
             1,  1,  1,
             1, -1,  1,

            // Left face
            -1, -1, -1,
            -1, -1,  1,
            -1,  1,  1,
            -1,  1, -1
        ];
        var vertexBuffer = this.gl.createBuffer();
        vertexBuffer.itemSize = 3;
        vertexBuffer.numItems = 4;

        this.gl.bindBuffer( this.gl.ARRAY_BUFFER, vertexBuffer );
        this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array( vertices ), this.gl.STATIC_DRAW );
        this.gl.vertexAttribPointer( this.program.vertex, vertexBuffer.itemSize, this.gl.FLOAT, false, 0, 0 );

       var colors = [
            [ 1, 0,   0,   1 ], // Front face
            [ 1, 1,   0,   1 ], // Back face
            [ 0, 1,   0,   1 ], // Top face
            [ 1, 0.5, 0.5, 1 ], // Bottom face
            [ 1, 0,   1,   1 ], // Right face
            [ 0, 0,   1,   1 ]  // Left face
        ];
        var unpackedColors = [];
        for ( var i in colors ) {
            var color = colors[ i ];
            for ( var j = 0; j < 4; ++j ) {
                unpackedColors = unpackedColors.concat( color );
            }
        }
        var colorBuffer = this.gl.createBuffer();
        colorBuffer.itemSize = 4;
        colorBuffer.numItems = 24;

        this.gl.bindBuffer( this.gl.ARRAY_BUFFER, colorBuffer );
        this.gl.bufferData( this.gl.ARRAY_BUFFER, new Float32Array( unpackedColors ), this.gl.STATIC_DRAW );
        this.gl.vertexAttribPointer( this.program.color, colorBuffer.itemSize, this.gl.FLOAT, false, 0, 0 );

        var indices = [
            0,  1,  2,  0,  2,  3,  // Front face
            4,  5,  6,  4,  6,  7,  // Back face
            8,  9,  10, 8,  10, 11, // Top face
            12, 13, 14, 12, 14, 15, // Bottom face
            16, 17, 18, 16, 18, 19, // Right face
            20, 21, 22, 20, 22, 23  // Left face
        ];
        this.indexBuffer = this.gl.createBuffer();
        this.indexBuffer.itemSize = 1;
        this.indexBuffer.numItems = 36;

        this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer );
        this.gl.bufferData( this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), this.gl.STATIC_DRAW );
    }
function(context, tile, buffers) {
        var datatype = ComponentDatatype.FLOAT;
        var typedArray = buffers.vertices;
        var buffer = context.createVertexBuffer(typedArray, BufferUsage.STATIC_DRAW);
        var stride = 5 * datatype.sizeInBytes;
        var attributes = [{
            index : TerrainProvider.attributeIndices.position3D,
            vertexBuffer : buffer,
            componentDatatype : datatype,
            componentsPerAttribute : 3,
            offsetInBytes : 0,
            strideInBytes : stride
        }, {
            index : TerrainProvider.attributeIndices.textureCoordinates,
            vertexBuffer : buffer,
            componentDatatype : datatype,
            componentsPerAttribute : 2,
            offsetInBytes : 3 * datatype.sizeInBytes,
            strideInBytes : stride
        }, {
            index : TerrainProvider.attributeIndices.position2D,
            value : [0.0, 0.0]
        }];
        var indexBuffer = buffers.indices.indexBuffer;
        if (typeof indexBuffer === 'undefined' || indexBuffer.isDestroyed()) {
            indexBuffer = buffers.indices.indexBuffer = context.createIndexBuffer(buffers.indices, BufferUsage.STATIC_DRAW, IndexDatatype.UNSIGNED_SHORT);
            indexBuffer.setVertexArrayDestroyable(false);
            indexBuffer.referenceCount = 1;
        } else {
            ++indexBuffer.referenceCount;
        }

        tile.vertexArray = context.createVertexArray(attributes, indexBuffer);
    }
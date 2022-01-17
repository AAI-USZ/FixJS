function(id, chunkId, chunkSize, chunk) {
        var obj = {};
        obj.command = 'CHUNK';
        obj.id = id;
        var data = {};
        data.chunkId = chunkId;
        data.chunkSize = chunkSize;
        data.chunk = chunk;
        obj.data = data;
        console.log('chunk()', obj);
        return sendObj(obj);
    }
function(filename, collection) {
        collection.update({ "filename": filename }, { $inc: { "metadata.accessCount": 1 } });
    }
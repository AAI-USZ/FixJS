function(filename, collection) {
        collection.update({ "filename": filename }, { $inc: { "metadata.accessCount": 1 }, $set: { "metadata.access": new Date()} });
    }
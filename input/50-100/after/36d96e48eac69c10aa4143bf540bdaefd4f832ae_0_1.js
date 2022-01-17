function (doc) {
      if (doc.resource === 'Post') {
        var x = doc._id;
        doc._id = doc._id.split('/').slice(1).join('/');
        emit(x, doc);
      }
    }
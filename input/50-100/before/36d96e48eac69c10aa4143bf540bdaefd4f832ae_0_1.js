function (doc) {
      if (doc.resource === 'Post') {
        emit(doc._id, { _id: doc._id });
      }
    }
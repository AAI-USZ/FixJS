function(doc) {
    if (doc.type == 'log') {
      words = doc.title.split(' ');
      for (word in words) {
        emit([words[word]], {
            id: doc._id,
            title: doc.title
        });
      }
    }
  }
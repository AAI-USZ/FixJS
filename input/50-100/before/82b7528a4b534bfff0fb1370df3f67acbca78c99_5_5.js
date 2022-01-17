function(doc) {
        if(doc.type == 'log') {
          var d = new Date(doc.created);
          emit(-d, doc);
        }
    }
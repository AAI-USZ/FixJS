function(doc) {
        if (doc.type == 'log') {
          var t = new Date(doc.created);
          var clip = (doc.text.length < 50 ? doc.text : doc.text.substring(0,47) + '...');
          var d = {
              _id: doc._id,
              created: doc.created,
              title: doc.title,
              clip: clip
          };
          emit(-t, d);
        }
    }
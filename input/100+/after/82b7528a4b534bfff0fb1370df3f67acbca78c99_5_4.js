function(doc) {
        if (doc.type == 'board') {
          var crate = parseInt(doc.config.snoplus.crate) ? doc.config.snoplus.crate : 20;
          emit(doc._id, [doc.status, doc.location, crate]);
        }
    }
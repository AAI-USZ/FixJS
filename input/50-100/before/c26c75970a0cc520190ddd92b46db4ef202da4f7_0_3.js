function() {
          var i = 0;

          for (; i < len; i++) {
            promises[i] = db.insertLink(fixtures[i]);
          }

          p.Promise.when(promises).then(spy, notCalled);
        }
function() {
          var i = 0;

          for (; i < len; i++) {
            promises[i] = db.getNextLinkID();
          }

          Promise.when(promises).then(spy, notCalled);
        }
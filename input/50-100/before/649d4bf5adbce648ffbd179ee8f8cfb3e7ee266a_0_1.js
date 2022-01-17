function(asset, error) {
          if (!error) {
            self.setValue(asset);
          } else {
            $(self.root).addClass('error');
            self.$caption('An error occurred');
          }
          self._state = S_READY;
          sefl._unserializationData = null;
        }
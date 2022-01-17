function(asset, error) {
          if (!error) {
            self.setValue(asset);
          } else {
            $(self.root).addClass('error');
            self.$caption.text('An error occurred');
          }
          self._state = S_READY;
          self._unserializationData = null;
        }
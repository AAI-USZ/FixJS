function(data) {
          console.log('ajax success');
          var count = data[0].channel_count;
          self.inputViewers.val(count);
        }
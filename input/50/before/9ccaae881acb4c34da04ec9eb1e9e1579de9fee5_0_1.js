function(data) {
          console.log('ajax success');
          var count = data[0].stream_count;
          self.inputViewers.val(count);
        }
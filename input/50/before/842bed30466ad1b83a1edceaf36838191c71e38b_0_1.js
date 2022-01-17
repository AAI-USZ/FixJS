function() {
         if (++counter < 3) {
            command('retry', 'abort');
         } else {
            done();
         }
      }
function(e) {
               if (timeout) {
                  clearTimeout(timeout);
               }
               if (!this.haderr) {
                  cb(e.message,1,null);
               }
               this.haderr = true;
            }
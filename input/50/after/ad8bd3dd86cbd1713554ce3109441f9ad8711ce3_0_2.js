function(e) {
               if (this.timeout) {
                  clearTimeout(this.timeout);
               }
               if (!this.haderr) {
                  cb(e.message,1,null);
               }
               this.haderr = true;
            }
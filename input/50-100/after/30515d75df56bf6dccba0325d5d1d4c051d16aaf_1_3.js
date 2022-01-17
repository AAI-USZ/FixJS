function() {
        if(this.pending > 0) {
          if(this.pending < chunkSize) {
            var cgroup = kcontacts.slice(pointer,pointer + this.pending);
            persistContactGroup(cgroup,function() { this.pending = 0;
                                                        this.onsuccess(); }.bind(this) );
          }
          else {
            (importSlice.bind(this))();
          }
        }
      }
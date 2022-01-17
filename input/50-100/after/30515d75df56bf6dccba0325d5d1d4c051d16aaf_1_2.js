function importSlice() {
        var cgroup = kcontacts.slice(pointer,pointer + chunkSize);
          persistContactGroup(cgroup,function() {
            pointer += chunkSize; this.pending -= chunkSize;
            this.onsuccess(); }.bind(this) );
      }
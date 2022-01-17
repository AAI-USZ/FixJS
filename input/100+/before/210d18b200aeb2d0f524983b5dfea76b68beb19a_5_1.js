function() {
      var output = [];
      var files = this.get("files");
      Utils.debug(files);
      for ( var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type
            || 'n/a', ') - ', f.size, ' bytes, last modified: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString()
                : 'n/a', '</li>');
      }
      var status = document.getElementById('status');
      if( status == null){
        status = document.createElement("div");
      }
      status.innerHTML += '<ul>' + output.join('') + '</ul>';

      this.on('all', function(e) {
        Utils.debug("Import event: " + e);
      });
    }
function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = callback;
        xhr.setRequestHeader( "X-Requested-With", "XMLHttpRequest" );
        xhr.send(null);
      }
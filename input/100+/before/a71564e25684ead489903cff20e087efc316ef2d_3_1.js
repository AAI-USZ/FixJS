function(url, data, callback, type) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onreadystatechange = callback;
        if( !type || type === "form" ){
          xhr.setRequestHeader("Content-Type", __types.form);
          xhr.send(parameterize(data));
        }
        else if( __types[ type ] ){
          xhr.setRequestHeader("Content-Type", __types[ type ]);
          xhr.send(data);
        }
        else{
          xhr.setRequestHeader("Content-Type", "text/plain");
          xhr.send(data);
        }
      }
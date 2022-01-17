function(model, response) {
            var url = window.location.pathname;
            window.location.href = url.substr(0, url.lastIndexOf('/'));
          }
function(e) {
        var t;
        modal.open();
        return t = setTimeout(function() {
          return modal.close(function() {
            var msg;
            msg = "<h1>Thank you!</h1>\n<p>A team of dedicated grawls will sort that out.</p>";
            modal.setContent(msg);
            return modal.open();
          });
        }, 500);
      }
function(jqXHR, textStatus, errorThrown) {
        var statusCode = jqXHR.statusCode().status;
        alert('Houston, we have a problem trying to log out: ' + statusCode + ' ' + errorThrown);
      }
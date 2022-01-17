function(jqXHR, textStatus, errorThrown) {
        var statusCode = jqXHR.statusCode().status;
        if (statusCode == 406) {
          $.mobile.changePage("#login");
        }
        else {
          alert('Houston, we have a problem trying to log out: ' + statusCode + ' ' + errorThrown);
        }
      }
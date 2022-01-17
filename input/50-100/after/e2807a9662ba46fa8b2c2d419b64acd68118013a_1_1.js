function(a, b) {

      for (var x = 0; x < a.internal_connections.length; x++) {

        if (a.internal_connections[x].other === b) {

          return a.internal_connections[x];

        }

      }



      return null;

    }
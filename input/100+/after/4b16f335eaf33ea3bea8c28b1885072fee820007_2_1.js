function(error, response) {
      var info = null,
          documents = {},
          i;

      if (error === null) {
        info = {
          'total': response.total_rows,
          'offset': response.offset
        };

        for (i = 0; response.rows[i]; ++i) {
          documents[response.rows[i].key] = {
            'id': response.rows[i].id,
            'value': response.rows[i].value
          };
        }
      }

      callback(error, info, documents);
    }
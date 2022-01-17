function findCallback() {
        if (request.result.length == 0)
          return;

        var contacts = request.result;
        callback(contacts[0]);
      }
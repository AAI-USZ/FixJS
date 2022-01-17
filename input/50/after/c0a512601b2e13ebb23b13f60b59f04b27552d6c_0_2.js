function () {
      selected_dbs[selection] = {
        client: connection,
        num_selected: 0
      };
      connection.removeAllListeners('error')
      setConnection(selection);
    }
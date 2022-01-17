function () {
      selected_dbs[selection] = {
        client: connection,
        num_selected: 0
      };
      setConnection(selection);
    }
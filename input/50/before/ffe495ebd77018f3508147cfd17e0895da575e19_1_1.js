function(viewport) {
      this.viewport = viewport;
      resources.connect(this.viewport);
      // we have to wait for onPreAttach to complete the connection
    }
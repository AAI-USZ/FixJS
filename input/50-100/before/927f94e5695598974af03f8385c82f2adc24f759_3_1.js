function (e) {
      if (e.target.className === "close") {
        self.trigger('beforeClose');
        self.close();
        self.trigger('close');
      }
    }
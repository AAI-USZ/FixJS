function () {
        self.port.emit("log", "Page is ready");
        try {
          fancySAForums.fancify();
          self.port.emit("log", "fancify completed");
        } catch (e) {
          self.port.emit("log", "fancify error: " + e);
        }
        if (fancySAHelper.breakTablesRegEx.test(document.location)) {
          self.port.emit("log", "Unbreaking tables...");
          fancySAHelper.UnbreakTables();
          self.port.emit("log", "Tables unbroken");
        }
        self.port.emit("log", "Page complete");
      }
function() {
      // 
      // ***** OVERALL DEBUG ENABLE IS HERE: *****
      //
      // Set to true to enable debug or trace messages.
      // See also the per-module enables farther below in
      // getLogger()
      //
      // Log messages will be written to ThumbnailZoomPlus/log.txt under
      // your profile dir.
      // On Mac OSX it might be
      // "/Users/$USER/Library/Application Support/Firefox/Profiles/7sep894p.developer/ThumbnailZoomPlus/log.txt"
      // On Windows it might be
      // 
      // To debug, set enableDebug above to true and monitor the log file
      // in a terminal using this command:
      // tail -200 -F "/Users/$USER/Library/Application Support/Firefox/Profiles/"*"/ThumbnailZoomPlus/log.txt"
      //
      // Enabling these increases CPU usage when moving the mouse in Firefox.
      // 
      let enableDebug = true;
      let enableTrace = true; // even more verbose
            
      // The basic formatter will output lines like:
      // DATE/TIME  LoggerName LEVEL  (log message)
      let formatter = new Log4Moz.AdvancedFormatter();
      formatter.dateFormat = "%Y-%m-%d %H:%M:%S%%L";
      let root = Log4Moz.repository.rootLogger;
      let logFile = this.getExtensionDirectory();
      let app;

      logFile.append("log.txt");

      // Loggers are hierarchical, lowering this log level will affect all
      // output.
      root.level = Log4Moz.Level["All"];

      // A console appender outputs to the JS Error Console.
      // app = new Log4Moz.ConsoleAppender(formatter);
      // app.level = Log4Moz.Level["Warn"];
      // root.addAppender(app);

      // A dump appender outputs to standard out.
      //app = new Log4Moz.DumpAppender(formatter);
      //app.level = Log4Moz.Level["Warn"];
      //root.addAppender(app);

      // This appender will log to the file system.
      app = new Log4Moz.RotatingFileAppender(logFile, formatter);
      
      if (enableTrace) {
        app.level = Log4Moz.Level["Trace"];
      } else if (enableDebug) {
        app.level = Log4Moz.Level["Debug"];
      } else {
        app.level = Log4Moz.Level["Warn"];
      }
      
      if (enableDebug || enableTrace) {
        this.logPath = logFile.path;
      } else {
        this.logPath = null;
      }
      
      root.addAppender(app);

      this._logger = ThumbnailZoomPlus.getLogger("ThumbnailZoomPlus.common");

      this._logger.debug("ThumbnailZoomPlus.logPath = " + ThumbnailZoomPlus.logPath);

      // get the observer service.
      this._observerService =
        Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
        
      this._consoleService = Cc["@mozilla.org/consoleservice;1"].
                                   getService(Ci.nsIConsoleService);
    }
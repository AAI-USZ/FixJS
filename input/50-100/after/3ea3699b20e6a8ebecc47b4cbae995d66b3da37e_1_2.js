function(error, over) {
        Log.error("Net error [" + (this.getName()) + "]: " + error + " " + error.stack);
        return this.consoleBuffer.addEvent({
          type: 'error',
          msg: error
        }, over);
      }
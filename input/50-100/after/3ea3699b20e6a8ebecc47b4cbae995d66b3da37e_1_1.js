function(error, over) {
        Log.error("Error [" + (this.getName()) + "]: " + error.stack);
        return this.consoleBuffer.addEvent({
          type: 'error',
          msg: error.args.join(' ')
        }, over);
      }
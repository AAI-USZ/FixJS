function(){
            //console.info("enabled autosave timer");
            var widget = this;
            this.timerAutoSave = new dojox.timing.Timer(this.delay);
            this.timerAutoSave.onTick = function() {
              widget._autoSave();
              //console.info("enabled autosave execute");
            };
            this.timerAutoSave.onStart = function() {};
            this.timerAutoSave.start();
        }
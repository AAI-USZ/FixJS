function(options, uri, toneRow) {
        this.options = options;
        this.uri = uri;
        this.toneRow = window.tr = toneRow;

        this.silentNoteVal = 0;
        this.buildFreqTable();

        this.dirty = true;
        this.processURI();

        //this.buildSequence();

        this.uri.onchangeHook = function() {
            this.processURI();
            //this.buildSequence();
            this.updateDisplay();
        }.bind(this);
    }
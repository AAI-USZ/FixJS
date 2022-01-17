function(options, uri, toneRow) {
        this.options = options;
        this.uri = uri;
        this.toneRow = window.tr = toneRow;

        this.silentNoteVal = 0;
        this.buildFreqTable();

        this.parseURI();

        this.dirty = true;
        this.buildSequence();

        this.uri.onchangeHook = function() {
            this.parseURI();
            this.buildSequence();
            this.updateDisplay();
        }.bind(this);
    }
function() {
        if (input.length > 0) {
            var note = modeNext();
            if (typeof note != 'undefined')
                midiOutput.sendMessage(note) ;
        }
    }
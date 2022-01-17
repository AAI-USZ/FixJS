function() {
        var note = modeNext();
        if (typeof note != 'undefined') // Simple "Thread Safety"
            midiOutput.sendMessage(note) ;
    }
function() {
        if (backchannel) {
            backchannel.postMessage({'cmd':'log', 'p': [].slice.call(arguments)});
        }
    }
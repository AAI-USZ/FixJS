function() {
        if (backchannel) {
            backchannel.postMessage({'cmd':'log', 'p': [].slice.call(arguments)});
        } else {
            dbg('no backchannel :/');
        }
        dbg.apply(this,[].slice.call(arguments));
    }
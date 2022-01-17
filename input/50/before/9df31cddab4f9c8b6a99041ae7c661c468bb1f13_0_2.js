function check() {
        // If twitter is switched on, start the main loop
        if( xt.options && xt.options['buffer.op.twitter'] === 'twitter') {
            twitterLoop();
        } else {
            setTimeout(check, 50);
        }
    }
function handleMessage(message) {
        if (message.length !== 2 || message[0] !== 'types') {
            debug.warn('Invalid types data:',message);
            debug.warn('message length',message.length,'topic',message[0]);
        }
        else {
            self.elm.html("<div>Updating...</div>")
                .effect('highlight',{color:'#ffd'},1000);
            updatePalette(message[1][0]);
        }
    }
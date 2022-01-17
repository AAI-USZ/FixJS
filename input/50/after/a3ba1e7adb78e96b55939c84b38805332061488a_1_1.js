function sendCommand (message) {
    if (theport && message) {
        try {
            theport.postMessage(encodeMessage(message));
        } catch(e) {}
    }
    window.close();
}
function bufferTwitter() {
        insertButtons();
        removeExtras();
        setTimeout(bufferTwitter, 500);
    }
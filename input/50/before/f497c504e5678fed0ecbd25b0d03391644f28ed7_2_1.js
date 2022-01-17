function enableButton () {
        button.disabled = !opera.extension.tabs.getFocused();
    }
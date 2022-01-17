function toggleButton (e) {
        var atab = opera.extension.tabs.getFocused();
        if (v12) {
            button.disabled = true;
            if (!!atab.port) atab.port.postMessage({ type: 'ask_status' });
        } else {
            button.disabled = !!atab;
        }
    }
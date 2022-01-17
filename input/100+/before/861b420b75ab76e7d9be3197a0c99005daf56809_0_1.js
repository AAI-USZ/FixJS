function (event) {
            if (event.keyCode === '13' || event.keyCode === 13 || event.keyCode === '0' || event.keyCode === 0) { // enter or return
                if (omnibar.value.trim() !== "") {
                    //default the protocal if not provided
                    omnibar.value = omnibar.value.indexOf("://") < 0 ? "http://" + omnibar.value : omnibar.value;
                    _persist(omnibar.value);
                    _persistRoot(omnibar.value);
                    emulatorBridge.window().location.assign(omnibar.value);
                }
            }
        }
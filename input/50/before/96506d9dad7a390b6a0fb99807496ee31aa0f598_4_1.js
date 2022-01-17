function (e) {
            console.log(e);
            cc.keypadDispatcher.dispatchKeypadMSG(e, true);
            cc.IMEDispatcher.sharedDispatcher().processKeycode(e.keyCode);
        }
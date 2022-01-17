function(){
        console.log("disable interactions");
        window.plugins.nativeUI.disableInteractions();
        interactionDisabled = true;
        console.log("disable interactions done");
        oldShow();
    }
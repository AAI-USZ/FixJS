function () {
    if (!cc.IMEDispatcher.s_instance) {
        cc.IMEDispatcher.s_instance = new cc.IMEDispatcher();
        cc.KeypadDispatcher.sharedDispatcher();
    }
    return cc.IMEDispatcher.s_instance;
}
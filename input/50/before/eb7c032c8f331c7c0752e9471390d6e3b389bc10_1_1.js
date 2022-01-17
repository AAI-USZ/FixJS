function () {
    if (!cc.IMEDispatcher.s_instance) {
        cc.IMEDispatcher.s_instance = new cc.IMEDispatcher();
    }
    return cc.IMEDispatcher.s_instance;
}
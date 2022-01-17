function tickLoop() {
    if (cocos2dNaclBlock == true) {
        cc.log("Thread was blocked for nacl.");
        setTimeout(tickLoop, 10);
    } else {
        cc.log("Thread was unblock.")
    }

}
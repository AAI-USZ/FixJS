function tickLoop() {
    if (cocos2dNaclBlock == true) {
        cc.Log("Thread was blocked for nacl.");
        setTimeout(tickLoop, 10);
    } else {
        cc.Log("Thread was unblock.")
    }

}
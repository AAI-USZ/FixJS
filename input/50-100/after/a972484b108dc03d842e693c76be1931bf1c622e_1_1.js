function naclCmdProcess(cmdType, cmd) {
    if (cmdType == asyncCmd) {
        cc.log("AsyncCmd result from nacl.");
        cocos2dnaclModule.postMessage(asyncCmd + ": " + "I am cocos2d.");
        return;
    } else {
        cocos2dNaclBlock = true;
        cocos2dnaclModule.postMessage(syncCmd + ": " + "I am cocos2d.");
        //tickLoop();
        return naclResult;
    }
}
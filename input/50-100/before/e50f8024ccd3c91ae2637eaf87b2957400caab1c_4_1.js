function($, CUtils, Utils, Sync) {
    Utils.initDebug()
    Sync.init()

    if(Utils.isDebugOn) {
        require(['tests/boot'], function(tests){
            tests.exec()
        })
    }
}
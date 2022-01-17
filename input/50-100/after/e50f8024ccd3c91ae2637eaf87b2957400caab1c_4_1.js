function($, Config, CUtils, Utils, Sync, Auth) {
    Utils.initDebug()

    if (Utils.inTestMode()) {
        require(['tests/boot'], function(tests) {
            tests.exec()
        })
    } else {
        Auth.login()
    }
}
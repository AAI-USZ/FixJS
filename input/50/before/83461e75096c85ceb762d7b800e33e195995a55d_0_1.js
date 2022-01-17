function browserExeExists(browser, cb){
            if (browser.exe instanceof Array)
                async.filter(browser.exe, path.exists, cb)
            else
                path.exists(browser.exe, cb)
        }
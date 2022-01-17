function(browser)
    {
        var annotation = "firebugged.showFirebug";
        this.setPageAnnotation(browser.currentURI.spec, annotation);
    }
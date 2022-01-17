function runTests() {
    testPrefs = OpenMEAP.getPreferences("tests");
    try {
        var evalOnInit = testPrefs.get("evalOnInit");
        if(evalOnInit!=null) {
            try {
                testPrefs.remove("evalOnInit");
                eval(evalOnInit);
            } catch(e) {
                alert(evalOnInit);
                alert(e);
            }
        } else {
            var innerHtml = "typeof(OpenMEAP) = "+typeof(OpenMEAP)+"<br/>";
            innerHtml = "<a href=\"javascript:testPreferences();\">Test Preferences</a><br/>";
            innerHtml += "<a href=\"javascript:testNonImmediateUpdates();\">Test Non-IMMEDIATE Updates</a><br/>";
            document.body.innerHTML=innerHtml;
        }
    } catch(e) {
        alert(e);
    }
}
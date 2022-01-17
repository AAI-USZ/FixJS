function (errorMsgs) {
    console.log('Analyzing code of the application core logic.');
    var coreOk = this.coreLogic.codeAnalysis(errorMsgs);
    console.log('Analyzing code of the Zepto/jQuery view models.');
    var zeptoOk = this.zeptoJQuery.viewModels.codeAnalysis(errorMsgs);
    console.log('Analyzing code of the Zepto API fix.');
    var apiFixOk = this.zeptoJQuery.apiFix.codeAnalysis(errorMsgs);
    console.log('Analyzing code of the Knockout view models.');
    var koOk = this.ko.viewModels.codeAnalysis(errorMsgs);
    console.log('Analyzing code of the unit tests.');
    var testsOk = this.unitTestSystem.codeAnalysis(errorMsgs);
    console.log('Analyzing code of the build system.');
    var buildOk = this.buildSystem.codeAnalysis(errorMsgs);

    return coreOk && zeptoOk && apiFixOk && koOk && testsOk && buildOk;
  }
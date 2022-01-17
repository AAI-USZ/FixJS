function () {

  var caseNodes = document.querySelectorAll('meta[name=case]');
  var cases = {};
  var caseNode;
  var caseName;
  var media;
  var matches;
  var prefix = window.headcase.prefix;

  for (var i = 0; i < caseNodes.length; i++) {
    caseName = caseNodes[i].getAttribute('content');

    cases[caseName] = {};
    cases[caseName].node = caseNodes[i];
    cases[caseName].media = caseNodes[i].getAttribute('media');
    cases[caseName].matches = window.matchMedia(cases[caseName].media).matches;

    if (typeof window.headcase.cases[caseName] == 'undefined') {
      cases[caseName].prevMatches = 'undefined'
    }
    else {
      cases[caseName].prevMatches = window.headcase.cases[caseName].matches;
    }
    //console.log('prev:', cases[caseName].prevMatches, 'new:', cases[caseName].matches);
  };

  for (caseName in cases) {

    //Only do stuff if the case has changed
    if (cases[caseName].prevMatches != cases[caseName].matches) {

      // Put the case immediately into window.headcase.cases
      window.headcase.cases[caseName] = {};
      window.headcase.cases[caseName].node = cases[caseName].node;
      window.headcase.cases[caseName].media = cases[caseName].media;
      window.headcase.cases[caseName].matches = cases[caseName].matches;

      //Add or remove appropriate class to/from <html>
      var classList = document.documentElement.className.split(/\s+/);
      var caseClass = prefix + caseName;
      var classIndex = classList.indexOf(caseClass);
      if (cases[caseName].matches && classIndex == -1) {
        classList.push(caseClass);
        document.documentElement.className = classList.join(' ');
      }
      else if (classIndex != -1) {
        classList.splice(classIndex, 1);
        document.documentElement.className = classList.join(' ');
      }

      /* Dispatch caseChange events */
      if (typeof CustomEvent != 'undefined') {
        var caseChangeEvent = document.createEvent('CustomEvent');
        caseChangeEvent.initCustomEvent(
          'caseChange',
          true,
          false,
          {
            caseName: caseName,
            media: cases[caseName].media,
            matches: cases[caseName].matches,
            caseNode: cases[caseName].node
          }
        );
        cases[caseName].node.dispatchEvent(caseChangeEvent);
      }
      else if (typeof document.createEvent('HTMLEvents') != 'undefined') {
        var caseChangeEvent = document.createEvent('HTMLEvents');
        caseChangeEvent.initEvent('caseChange', true, false);
        caseChangeEvent.detail = {
          caseName: caseName,
          media: cases[caseName].media,
          matches: cases[caseName].matches,
          caseNode: cases[caseName].node
        }
        cases[caseName].node.dispatchEvent(caseChangeEvent);
      }
    };
  }

  return window.headcase.cases;
}
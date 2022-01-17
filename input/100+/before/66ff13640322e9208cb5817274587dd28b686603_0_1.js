function () {

  var caseNodes = document.querySelectorAll('meta[name=case]');
  var cases = {};
  var caseNode;
  var caseName;
  var media;
  var matches;

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

    // Put the case immediately into window.headcase.cases
    window.headcase.cases[caseName] = {};
    window.headcase.cases[caseName].node = cases[caseName].node;
    window.headcase.cases[caseName].media = cases[caseName].media;
    window.headcase.cases[caseName].matches = cases[caseName].matches;

    //Add classes to <html>
    if (cases[caseName].matches) {
      document.documentElement.classList.add('case-' + caseName);
    }
    else {
      document.documentElement.classList.remove('case-' + caseName);
    }

    /* Dispatch caseChange events */


    if (typeof CustomEvent != 'undefined' && cases[caseName].prevMatches != cases[caseName].matches) {
      var caseChangeEvent = new CustomEvent(
        "caseChange",
        {
          detail: {
            caseName: caseName,
            media: cases[caseName].media,
            matches: cases[caseName].matches,
            caseNode: cases[caseName].node
          },
          bubbles: true,
          cancelable: false
        }
      );
      cases[caseName].node.dispatchEvent(caseChangeEvent);

    }
    else if (typeof document.createEvent('HTMLEvents') != 'undefined' && cases[caseName].prevMatches != cases[caseName].matches) {
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

    //TODO: creating an HTMLEvent that just had a custom name seemed to work on safari, could use that if CustomEvent is not defined. Need to test that on IE too, maybe it works just like that. As a last resort hack, could resort to piggybacking on some regular event, like active, change, blur, something. Or maybe just a custom event binding mechanism, like window.headcase.bind(caseName, function{}) just like many other similar js projects that use custom events.

    //TODO: should there be separate events for case match and case unmatch? Each case should have a separate event in any case. So you can bind a listener to just a specific case, instead of figuring out which case fired the event in the handler function.
    
    //TODO: update readme accordingly, no more document.addEventListener('caseChange'), instead use caseElement.addEventListener('caseChange')

  }

  return window.headcase.cases;
}
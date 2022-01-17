function(
    scripts, url, wrappedContentWin
) {
  var chromeWin = getChromeWinForContentWin(wrappedContentWin);
  var firebugConsole = getFirebugConsole(wrappedContentWin, chromeWin);

  for (var i = 0, script = null; script = scripts[i]; i++) {
    var sandbox = createSandbox(
        script, wrappedContentWin, chromeWin, firebugConsole, url);

    var scriptSrc = GM_util.getScriptSource(script);
    var shouldWrap = !script.unwrap && !GM_util.inArray(script.grants, 'none');
    if (shouldWrap) scriptSrc = GM_util.anonWrap(scriptSrc);
    if (!runScriptInSandbox(scriptSrc, sandbox, script) && !shouldWrap) {
      // Wrap anyway on early return.
      runScriptInSandbox(GM_util.anonWrap(scriptSrc), sandbox, script);
    }
  }
}
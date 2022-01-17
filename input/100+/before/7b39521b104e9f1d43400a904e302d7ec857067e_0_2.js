function(test) {
  test.waitUntilDone();

  // Change the locale before loading new l10n modules in order to load
  // the right .properties file
  setLocale("en-GB");
  let loader = Loader(module);

  // Ensure initing html component that watch document creations
  // Note that this module is automatically initialized in
  // cuddlefish.js:Loader.main in regular addons. But it isn't for unit tests.
  let loaderHtmlL10n = loader.require("api-utils/l10n/html");
  loaderHtmlL10n.enable();

  let uri = require("self").data.url("test-localization.html");
  let worker = loader.require("page-worker").Page({
    contentURL: uri,
    contentScript: "new " + function ContentScriptScope() {
      let nodes = document.body.querySelectorAll("*[data-l10n-id]");
      self.postMessage([nodes[0].innerHTML,
                        nodes[1].innerHTML,
                        nodes[2].innerHTML,
                        nodes[3].innerHTML]);
    },
    onMessage: function (data) {
      test.assertEqual(
        data[0],
        "Kept as-is",
        "Nodes with unknown id in .properties are kept 'as-is'"
      );
      test.assertEqual(data[1], "Yes", "HTML is translated");
      test.assertEqual(
        data[2],
        "no &lt;b&gt;HTML&lt;/b&gt; injection",
        "Content from .properties is text content; HTML can't be injected."
      );
      test.assertEqual(data[3], "Yes", "Multiple elements with same data-l10n-id are accepted.");

      loader.unload();
      resetLocale();

      test.done();
    }
  });

}
function (data) {
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

      done();
    }
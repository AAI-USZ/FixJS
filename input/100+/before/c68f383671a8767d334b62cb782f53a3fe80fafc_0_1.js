function(test) {
  test.assertEqual(findClosestLocale([], []), null,
                   "When everything is empty we get null");

  test.assertEqual(findClosestLocale(["en-US", "en"], ["en"]),
                   "en", "We ignore more specialized locale, when there is a more generic locale");
  test.assertEqual(findClosestLocale(["ja-JP"], ["ja"]),
                   "ja-JP", "We accept more specialized locale, when there is no exact match nor more generic 1/2");
  test.assertEqual(findClosestLocale(["ja-JP-mac", "ja"], ["ja-JP"]),
                   "ja", "We accept more specialized locale, when there is no exact match nor more generic 2/2");
  test.assertEqual(findClosestLocale(["en", "en-US"], ["en-US"]),
                   "en", "We accept more generic locale first, even over exact match 1/2");
  test.assertEqual(findClosestLocale(["ja-JP-mac", "ja", "ja-JP"], ["ja-JP"]),
                   "ja", "We accept more generic locale first, even over exact match 2/2");

  test.assertEqual(findClosestLocale(["en-US", "en"], ["en"]),
                   "en", "But we accept more specialized first 1/2");
  test.assertEqual(findClosestLocale(["en", "en-US"], ["en"]),
                   "en", "But we accept more specialized first 2/2");

  test.assertEqual(findClosestLocale(["en-US"], ["en-US"]),
                   "en-US", "Case doesn't matter, but we keep the original one as result 1/3");
  test.assertEqual(findClosestLocale(["en-US"], ["en-us"]),
                   "en-US", "Case doesn't matter, but we keep the original one as result 2/3");
  test.assertEqual(findClosestLocale(["en-us"], ["en-US"]),
                   "en-us", "Case doesn't matter, but we keep the original one as result 3/3");

  test.assertEqual(findClosestLocale(["ja-JP-mac"], ["ja-JP-mac"]),
                   "ja-JP-mac", "We accept locale with 3 parts");
  test.assertEqual(findClosestLocale(["ja-JP"], ["ja-JP-mac"]),
                   "ja-JP", "We accept locale with 2 parts from locale with 3 parts");
  test.assertEqual(findClosestLocale(["ja"], ["ja-JP-mac"]),
                   "ja", "We accept locale with 1 part from locale with 3 parts");
}
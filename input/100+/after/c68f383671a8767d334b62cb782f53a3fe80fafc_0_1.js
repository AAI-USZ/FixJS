function(test) {
  // Second param of findClosestLocale (aMatchLocales) have to be in lowercase
  test.assertEqual(findClosestLocale([], []), null,
                   "When everything is empty we get null");

  test.assertEqual(findClosestLocale(["en", "en-US"], ["en"]),
                   "en", "We always accept exact match first 1/5");
  test.assertEqual(findClosestLocale(["en-US", "en"], ["en"]),
                   "en", "We always accept exact match first 2/5");
  test.assertEqual(findClosestLocale(["en", "en-US"], ["en-us"]),
                   "en-US", "We always accept exact match first 3/5");
  test.assertEqual(findClosestLocale(["ja-JP-mac", "ja", "ja-JP"], ["ja-jp"]),
                   "ja-JP", "We always accept exact match first 4/5");
  test.assertEqual(findClosestLocale(["ja-JP-mac", "ja", "ja-JP"], ["ja-jp-mac"]),
                   "ja-JP-mac", "We always accept exact match first 5/5");

  test.assertEqual(findClosestLocale(["en", "en-GB"], ["en-us"]),
                   "en", "We accept more generic locale, when there is no exact match 1/2");
  test.assertEqual(findClosestLocale(["en-ZA", "en"], ["en-gb"]),
                   "en", "We accept more generic locale, when there is no exact match 2/2");

  test.assertEqual(findClosestLocale(["ja-JP"], ["ja"]),
                   "ja-JP", "We accept more specialized locale, when there is no exact match 1/2");
  // Better to select "ja" in this case but behave same as current AddonManager
  test.assertEqual(findClosestLocale(["ja-JP-mac", "ja"], ["ja-jp"]),
                   "ja-JP-mac", "We accept more specialized locale, when there is no exact match 2/2");

  test.assertEqual(findClosestLocale(["en-US"], ["en-us"]),
                   "en-US", "We keep the original one as result 1/2");
  test.assertEqual(findClosestLocale(["en-us"], ["en-us"]),
                   "en-us", "We keep the original one as result 2/2");

  test.assertEqual(findClosestLocale(["ja-JP-mac"], ["ja-jp-mac"]),
                   "ja-JP-mac", "We accept locale with 3 parts");
  test.assertEqual(findClosestLocale(["ja-JP"], ["ja-jp-mac"]),
                   "ja-JP", "We accept locale with 2 parts from locale with 3 parts");
  test.assertEqual(findClosestLocale(["ja"], ["ja-jp-mac"]),
                   "ja", "We accept locale with 1 part from locale with 3 parts");
}
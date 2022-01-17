function(test, loader, done) {
  let _ = loader.require("l10n").get;
  test.assertEqual(_("Not translated"), "Not translated");
  test.assertEqual(_("Translated"), "Yes");

  // Check plural forms regular matching
  test.assertEqual(_("downloadsCount", 0),
                   "0 downloads",
                   "PluralForm form 'other' for 0 in english");
  test.assertEqual(_("downloadsCount", 1),
                   "one download",
                   "PluralForm form 'one' for 1 in english");
  test.assertEqual(_("downloadsCount", 2),
                   "2 downloads",
                   "PluralForm form 'other' for n != 1 in english");

  // Check optional plural forms
  test.assertEqual(_("pluralTest", 0),
                   "optional zero form",
                   "PluralForm form 'zero' can be optionaly specified. (Isn't mandatory in english)");
  test.assertEqual(_("pluralTest", 1),
                   "fallback to other",
                   "If the specific plural form is missing, we fallback to 'other'");

  // Ensure that we can omit specifying the generic key without [other]
  // key[one] = ...
  // key[other] = ...  # Instead of `key = ...`
  test.assertEqual(_("explicitPlural", 1),
                   "one",
                   "PluralForm form can be omitting generic key [i.e. without ...[other] at end of key)");
  test.assertEqual(_("explicitPlural", 10),
                   "other",
                   "PluralForm form can be omitting generic key [i.e. without ...[other] at end of key)");

  done();
}
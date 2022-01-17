function(test) {
  let loader = Loader(module);
  setLocale("fr-FR");

  let _ = loader.require("l10n").get;
  test.assertEqual(_("Not translated"), "Not translated",
                   "Key not translated");
  test.assertEqual(_("Translated"), "Oui",
                   "Simple key translated");

  // Placeholders
  test.assertEqual(_("placeholderString", "works"), "Placeholder works",
                   "Value with placeholder");
  test.assertEqual(_("Placeholder %s", "works"), "Placeholder works",
                   "Key without value but with placeholder");
  test.assertEqual(_("Placeholders %2s %1s %s.", "working", "are", "correctly"), 
                   "Placeholders are working correctly.",
                   "Multiple placeholders");

  // Plurals
  test.assertEqual(_("downloadsCount", 0),
                   "0 téléchargement",
                   "PluralForm form 'one' for 0 in french");
  test.assertEqual(_("downloadsCount", 1),
                   "1 téléchargement",
                   "PluralForm form 'one' for 1 in french");
  test.assertEqual(_("downloadsCount", 2),
                   "2 téléchargements",
                   "PluralForm form 'other' for n > 1 in french");

  loader.unload();
  resetLocale();
}
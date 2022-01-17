function language() {
  return bestMatchingLocale ? bestMatchingLocale.split("-")[0].toLowerCase()
                            : null;
}
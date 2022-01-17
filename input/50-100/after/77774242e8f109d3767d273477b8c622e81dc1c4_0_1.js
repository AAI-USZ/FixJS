function() {
    var result = localStorage.getItem(this.getStorageKey(STORAGE_KEY_PSEUDONYM));
    // 2012-06-18: Layout change on developer.apple.com resulted in
    // pseudonym DB getting contaminated with HTML cruft, specifically <br>
    // followed by some whitespace. Here we'll clean up those entries and
    // save the cleaned-up versions if needed.

    // If result is null there is nothing to clean up, bail.
    if (!result) return;

    var re = /\s*<br>.*/;
    var trimmed = result.replace(re, '');
    if (trimmed !== result) {
        this.setPseudonym(trimmed);
    }
    return trimmed;
}
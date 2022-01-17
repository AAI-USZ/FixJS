function(x) {
    /* origin regex
    /^                          // beginning
    https?:\/\/                 // starts with http:// or https://
    (?=.{1,254}(?::|$))         // hostname must be within 1-254 characters
    (?:                         // match hostname part (<part>.<part>...)
      (?!\d|-)                  // cannot start with a digit or dash
      (?![a-z0-9\-]{1,62}-      // part cannot end with a dash
        (?:\.|:|$))             // (end of part will be '.', ':', or end of str)
      [a-z0-9\-]{1,63}\b        // part will be 1-63 letters, numbers, or dashes
        (?!\.$)                 // final part cannot end with a '.'
        \.?                     // part followed by '.' unless final part
    )+                          // one or more hostname parts
    (:\d+)?                     // optional port
    $/i;                        // end; case-insensitive
    */
    var regex = /^https?:\/\/(?=.{1,254}(?::|$))(?:(?!\d|-)(?![a-z0-9\-]{1,62}-(?:\.|:|$))[a-z0-9\-]{1,63}\b(?!\.$)\.?)+(:\d+)?$/i;
    if (typeof x !== 'string' || !x.match(regex)) {
      throw new Error("not a valid origin");
    }
  }
f    // An rsid is a string which is encoded from xcards with BASE64XML,
    // so that each character in rsid is corresponding to a 6-bit value.
    // To simplify both encoding and decoding,
    // we use only an array of 6-bit values to convert rsid from/to xcards.
    //
    // The first character in an rsid represents a version of rsid/xcards
    // conversion.  There is only one version at the moment,
    // and the version is 0x01 ('A').
    //
    // The rest of characters in an rsid represent xcards.
    //
    // A xcard is represented with 12-bit value.
    // The most significant bit represents a dropped status,
    // where 0 means available and 1 means dropped.
    // The rest bits represent a cid.
    // Other information of a xcard is retrieved by H.card_from_cid.

    var bs = H.decode_base64xml(rsid);
    var xcards = [];

    var version = bs.shift();
    if (version != 0x01)
      throw new H.Error(JSON.stringify(version) + ' is not a valid version.');

    while (2 <= bs.length) {
      var b1 = bs.shift();
      var b2 = bs.shift();
      var dropped = !!(b1 & (1 << 5));
      var cid = ((b1 & ((1 << 5) - 1)) << 6) | b2;
      var xcard = H.xcard_from_card(H.card_from_cid(cid));
      xcard.dropped = dropped;
      xcards.push(xcard);
    }
    if (bs.length != 0) {
      throw new H.Error([
        JSON.stringify(rsid), 'is not valid RSID;',
        'it contains trailing data:', JSON.stringify(bs)
      ].join(' '));
    }

    return xcards;
  };

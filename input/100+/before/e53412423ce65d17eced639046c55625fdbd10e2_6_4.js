function generateForwardBodyText(rep) {
  var strBits = [], nl;

  for (var i = 0; i < rep.length; i += 2) {
    if (i)
      strBits.push(NEWLINE);

    var etype = rep[i]&0xf, block = rep[i + 1];
    switch (etype) {
      // - injected with restored whitespace
      case CT_AUTHORED_CONTENT:
        // pre-newlines
        for (nl = (rep[i] >> 8)&0xff; nl; nl--)
          strBits.push(NEWLINE);
        strBits.push(block);
        // post new-lines
        for (nl = (rep[i] >> 16)&0xff; nl; nl--)
          strBits.push(NEWLINE);
        break;
      case CT_LEADIN_TO_QUOTE:
        strBits.push(block);
        for (nl = (rep[i] >> 8)&0xff; nl; nl--)
          strBits.push(NEWLINE);
        break;
      // - injected verbatim,
      case CT_SIGNATURE:
      case CT_BOILERPLATE_DISCLAIMER:
      case CT_BOILERPLATE_LIST_INFO:
      case CT_BOILERPLATE_PRODUCT:
      case CT_BOILERPLATE_ADS:
        for (nl = (rep[i] >> 8)&0xff; nl; nl--)
          strBits.push(NEWLINE);
        strBits.push(block);
        break;
      // - quote character reconstruction
      // this is not guaranteed to round-trip since we assume the non-whitespace
      // variant...
      case CT_QUOTED_TYPE:
        var depth = Math.min((rep[i] >> 8)&0xff, 8);
        for (nl = (rep[i] >> 16)&0xff; nl; nl--) {
          strBits.push(replyQuotePrefixStringsNoSpace[depth]);
          strBits.push(NEWLINE);
        }
        strBits.push(expandQuotedPrefix(block, depth));
        strBits.push(expandQuoted(block, depth));
        for (nl = (rep[i] >> 24)&0xff; nl; nl--) {
          strBits.push(NEWLINE);
          strBits.push(replyQuotePrefixStringsNoSpace[depth]);
        }
        break;
    }
  }

  return strBits.join('');
}
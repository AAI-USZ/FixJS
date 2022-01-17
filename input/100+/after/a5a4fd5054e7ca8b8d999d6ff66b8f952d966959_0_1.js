function utf8Write(view, offset, string) {
  var byteLength = view.byteLength;
  for(var i = 0, l = string.length; i < l; i++) {
    var codePoint = string.charCodeAt(i);

    // One byte of UTF-8
    if (codePoint < 0x80) {
      view.setUint8(offset++, codePoint >>> 0 & 0x7f | 0x00);
      continue;
    }

    // Two bytes of UTF-8
    if (codePoint < 0x800) {
      view.setUint8(offset++, codePoint >>> 6 & 0x1f | 0xc0);
      view.setUint8(offset++, codePoint >>> 0 & 0x3f | 0x80);
      continue;
    }

    // Three bytes of UTF-8.  
    if (codePoint < 0x10000) {
      view.setUint8(offset++, codePoint >>> 12 & 0x0f | 0xe0);
      view.setUint8(offset++, codePoint >>> 6  & 0x3f | 0x80);
      view.setUint8(offset++, codePoint >>> 0  & 0x3f | 0x80);
      continue;
    }

    // Four bytes of UTF-8
    if (codePoint < 0x110000) {
      view.setUint8(offset++, codePoint >>> 18 & 0x07 | 0xf0);
      view.setUint8(offset++, codePoint >>> 12 & 0x3f | 0x80);
      view.setUint8(offset++, codePoint >>> 6  & 0x3f | 0x80);
      view.setUint8(offset++, codePoint >>> 0  & 0x3f | 0x80);
      continue;
    }
    throw new Error("bad codepoint " + codePoint);
  }
}
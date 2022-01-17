function malloc(nBytes) {
    const $U4 = $M.U4;
    var p = 0, prevp = 0;
    var nUnits = ((((nBytes + 8 | 0) - 1 | 0) / 8 | 0) + 1 | 0) >>> 0;
    if ((prevp = freep) === 0) {
      $U4[base] = freep = prevp = base;
      $U4[base + 1] = 0;
    }
    for (p = $U4[prevp]; true; prevp = p, p = $U4[p]) {
      if ($U4[p + 1] >= nUnits) {
        if ($U4[p + 1] === nUnits) {
          $U4[prevp] = $U4[p];
        } else {
          $U4[p + 1] = ($U4[p + 1] - nUnits | 0) >>> 0;
          p = p + $U4[p + 1] * 2;
          $U4[p + 1] = nUnits;
        }
        freep = prevp;
        // record that this chunck of memory can be addressed
        ck.setAddressable(p + 1 * 2 << 2, nBytes, true);
        // recored that this byte was allocated (and should be freed later)
        var cname = typeof malloc.caller === 'undefined' ? '' : malloc.caller.name;
        ck.setAlloc(p + 1 * 2 << 2, true, cname);
        return p + 1 * 2 << 2;
      }
      if (p === freep) {
        if ((p = morecore(nUnits)) === 0) {
          return 0;
        }
      }
    }
    return 0;
  }
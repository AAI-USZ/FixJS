function () {
      // This is a problematic case.  Because cards with cid >= 0x40 consit of
      // 7 or more bits and require 2 character in BASE64.
      var original_table = H.CID_TO_CARD_TABLE;
      this.after(function () {
        H.CID_TO_CARD_TABLE = original_table;
      });
      H.CID_TO_CARD_TABLE = $.extend(
        {
          0x3f: {cid: 0x3f},
          0x40: {cid: 0x40},
          0x41: {cid: 0x41},
          0x82: {cid: 0x82},
          0x104: {cid: 0x104},
          0x208: {cid: 0x208},
          0x410: {cid: 0x410}
        },
        original_table
      );
      expect(H.xcards_from_rsid('BA-g-BAhABBhBCCiCEEkEIIoIQQwQ')).toEqual([
        {dropped: false, cid: 0x3f},
        {dropped: true, cid: 0x3f},
        {dropped: false, cid: 0x40},
        {dropped: true, cid: 0x40},
        {dropped: false, cid: 0x41},
        {dropped: true, cid: 0x41},
        {dropped: false, cid: 0x82},
        {dropped: true, cid: 0x82},
        {dropped: false, cid: 0x104},
        {dropped: true, cid: 0x104},
        {dropped: false, cid: 0x208},
        {dropped: true, cid: 0x208},
        {dropped: false, cid: 0x410},
        {dropped: true, cid: 0x410}
      ]);
    }
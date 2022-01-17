function () {
      // This is a problematic case.  Because cards with cid >= 0x40 consit of
      // 7 or more bits and require 2 character in BASE64.
      expect(
        H.rsid_from_xcards([
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
        ])
      ).toEqual('BA-g-BAhABBhBCCiCEEkEIIoIQQwQ');
    }